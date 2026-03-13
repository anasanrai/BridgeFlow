import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import Replicate from "replicate";

export const dynamic = "force-dynamic";
export const maxDuration = 120; // Replicate can take time



export async function POST(req: Request) {
    try {
        const replicateToken = process.env.REPLICATE_API_TOKEN;
        if (!replicateToken) {
            return NextResponse.json({ error: "Replicate API token not configured. Please add REPLICATE_API_TOKEN to .env.local" }, { status: 500 });
        }

        const replicate = new Replicate({ auth: replicateToken });
        const sb = createAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB connection" }, { status: 500 });

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const templateSlug = formData.get("slug") as string || "template";
        const removeBg = formData.get("removeBg") === "true";
        const upscale = formData.get("upscale") === "true";

        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

        // 1. Upload original to Supabase to get a public URL for Replicate
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const folder = `templates/${templateSlug}`;
        const tempFilename = `${folder}/temp-${Date.now()}.png`;
        const bucket = "bridgeflow-media";

        const { error: uploadError } = await sb.storage.from(bucket).upload(tempFilename, buffer, {
            contentType: file.type,
            upsert: true,
        });

        if (uploadError) throw new Error(`Initial upload failed: ${uploadError.message}`);

        const { data: { publicUrl: originalUrl } } = sb.storage.from(bucket).getPublicUrl(tempFilename);

        let currentImageUrl = originalUrl;

        // 2. Process with Replicate
        // Step A: Remove Background
        if (removeBg) {
            console.log("Removing background...");
            const output = await replicate.run(
                "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
                { input: { image: currentImageUrl } }
            );
            currentImageUrl = output as unknown as string;
        }

        // Step B: Upscale to 4K
        if (upscale) {
            console.log("Upscaling to 4K...");
            const output = await replicate.run(
                "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
                { input: { image: currentImageUrl, scale: 4, face_enhance: false } }
            );
            currentImageUrl = output as unknown as string;
        }

        // 3. Download final result and save to Supabase
        const finalRes = await fetch(currentImageUrl);
        const finalBuffer = Buffer.from(await finalRes.arrayBuffer());
        const finalFilename = `${folder}/workflow-${Date.now()}.png`;

        const { error: finalUploadError } = await sb.storage.from(bucket).upload(finalFilename, finalBuffer, {
            contentType: "image/png",
            upsert: true,
        });

        if (finalUploadError) throw new Error(`Final upload failed: ${finalUploadError.message}`);

        const { data: { publicUrl: finalUrl } } = sb.storage.from(bucket).getPublicUrl(finalFilename);

        // Cleanup temp file
        await sb.storage.from(bucket).remove([tempFilename]);

        return NextResponse.json({
            ok: true,
            url: finalUrl,
            processed: { bgRemoved: removeBg, upscaled: upscale }
        });

    } catch (err: any) {
        console.error("Image processing error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
