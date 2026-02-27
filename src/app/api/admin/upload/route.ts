import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function POST(req: Request) {
    try {
        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB" }, { status: 500 });

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const folder = (formData.get("folder") as string) || "uploads";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate unique filename
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        // Ensure bucket exists
        const bucket = "bridgeflow-media";
        try {
            await sb.storage.createBucket(bucket, { public: true });
        } catch {
            // Bucket already exists - that's fine
        }

        const { error: uploadError } = await sb.storage
            .from(bucket)
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: urlData } = sb.storage.from(bucket).getPublicUrl(filename);

        return NextResponse.json({ url: urlData.publicUrl, filename });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
