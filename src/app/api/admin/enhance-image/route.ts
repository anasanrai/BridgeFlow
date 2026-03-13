import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";
import Replicate from "replicate";

export async function POST(req: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const replicateToken = process.env.REPLICATE_API_TOKEN;
        if (!replicateToken) {
            return NextResponse.json({ error: "Replicate API token not configured." }, { status: 500 });
        }

        const replicate = new Replicate({ auth: replicateToken });
        const sb = createAdminClient();

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "uploads/ai-enhanced";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, or WebP are allowed." }, { status: 400 });
        }

        // 1. Upload original to Supabase to get a public URL for Replicate
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalExt = file.name.split(".").pop() || "jpg";
        const tempFilename = `${folder}/temp-${Date.now()}-${Math.random().toString(36).slice(2)}.${originalExt}`;
        const bucket = "bridgeflow-media";

        try { await sb.storage.createBucket(bucket, { public: true }); } catch { /* ignore */ }

        const { error: uploadError } = await sb.storage.from(bucket).upload(tempFilename, buffer, {
            contentType: file.type,
            upsert: false,
        });

        if (uploadError) {
            throw new Error(`Failed to upload initial image: ${uploadError.message}`);
        }

        const { data: { publicUrl: originalUrl } } = sb.storage.from(bucket).getPublicUrl(tempFilename);

        console.log("Original URL generated:", originalUrl);

        // 2. Remove Background using Replicate
        console.log("Starting background removal...");
        const noBgResult = await replicate.run(
            "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
            {
                input: {
                    image: originalUrl
                }
            }
        ) as unknown as string;

        console.log("Background removal complete:", noBgResult);

        // 3. Enhance/Upscale using Real-ESRGAN
        console.log("Starting 4K enhancement...");
        const enhancedResult = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
                input: {
                    image: noBgResult,
                    scale: 4,
                    face_enhance: false
                }
            }
        ) as unknown as string;

        console.log("Enhancement complete:", enhancedResult);

        // 4. Download the final enhanced image
        const imageResponse = await fetch(enhancedResult);
        if (!imageResponse.ok) {
            throw new Error("Failed to download enhanced image from Replicate");
        }

        const finalArrayBuffer = await imageResponse.arrayBuffer();
        const finalBuffer = Buffer.from(finalArrayBuffer);

        // 5. Upload final image to Supabase
        const finalFilename = `${folder}/enhanced-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;

        const { error: finalUploadError } = await sb.storage.from(bucket).upload(finalFilename, finalBuffer, {
            contentType: "image/png",
            upsert: false,
        });

        if (finalUploadError) {
            throw new Error(`Failed to upload final image: ${finalUploadError.message}`);
        }

        const { data: { publicUrl: finalUrl } } = sb.storage.from(bucket).getPublicUrl(finalFilename);

        // Clean up the temporary file
        await sb.storage.from(bucket).remove([tempFilename]);

        return NextResponse.json({ url: finalUrl, filename: finalFilename });

    } catch (err: any) {
        console.error("AI Enhancement Error:", err);
        return NextResponse.json({ error: err.message || "An error occurred during image processing" }, { status: 500 });
    }
}
