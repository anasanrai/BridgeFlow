import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { exec } from "child_process";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

function execPromise(cmd: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
        exec(cmd, { maxBuffer: 50 * 1024 * 1024 }, (err, stdout, stderr) => {
            if (err) reject(new Error(stderr || err.message));
            else resolve({ stdout, stderr });
        });
    });
}

export async function POST(req: Request) {
    try {
        const sb = getAdminClient();
        if (!sb) return NextResponse.json({ error: "No DB connection" }, { status: 500 });

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const templateSlug = formData.get("slug") as string || "template";
        const removeBg = formData.get("removeBg") === "true";
        const upscale = formData.get("upscale") === "true";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
            return NextResponse.json({ error: "Only JPEG, PNG, or WebP images are allowed" }, { status: 400 });
        }

        if (file.size > 20 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Max 20MB." }, { status: 400 });
        }

        // Create temp directory
        const tmpDir = path.join(os.tmpdir(), `bf-template-${Date.now()}`);
        await mkdir(tmpDir, { recursive: true });

        const inputPath = path.join(tmpDir, `input.${file.type.split("/")[1]}`);
        const bgRemovedPath = path.join(tmpDir, "bg_removed.png");
        const upscaledPath = path.join(tmpDir, "upscaled.png");
        const finalPath = path.join(tmpDir, "final.png");

        // Write input file
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(inputPath, buffer);

        let currentPath = inputPath;

        // Step 1: Remove background if requested
        if (removeBg) {
            try {
                const pythonScript = `
import sys
try:
    from rembg import remove
    from PIL import Image
    import io
    
    with open("${inputPath}", "rb") as f:
        input_data = f.read()
    
    output_data = remove(input_data)
    
    with open("${bgRemovedPath}", "wb") as f:
        f.write(output_data)
    
    print("SUCCESS")
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    sys.exit(1)
`;
                const scriptPath = path.join(tmpDir, "remove_bg.py");
                await writeFile(scriptPath, pythonScript);
                await execPromise(`python3.11 "${scriptPath}"`);
                currentPath = bgRemovedPath;
            } catch (bgError) {
                console.warn("Background removal failed, using original:", bgError);
                // Continue with original if bg removal fails
            }
        }

        // Step 2: Upscale to 4K if requested
        if (upscale) {
            try {
                const pythonUpscale = `
import sys
try:
    from PIL import Image, ImageFilter, ImageEnhance
    import os
    
    img = Image.open("${currentPath}").convert("RGBA")
    
    # Target 4K resolution (3840x2160) maintaining aspect ratio
    target_w, target_h = 3840, 2160
    orig_w, orig_h = img.size
    
    # Calculate scale to fit within 4K while maintaining aspect ratio
    scale = min(target_w / orig_w, target_h / orig_h)
    new_w = int(orig_w * scale)
    new_h = int(orig_h * scale)
    
    # Use LANCZOS for high-quality upscaling
    upscaled = img.resize((new_w, new_h), Image.LANCZOS)
    
    # Apply subtle sharpening to enhance details
    enhancer = ImageEnhance.Sharpness(upscaled)
    upscaled = enhancer.enhance(1.3)
    
    # Enhance contrast slightly
    contrast = ImageEnhance.Contrast(upscaled)
    upscaled = contrast.enhance(1.1)
    
    upscaled.save("${upscaledPath}", "PNG", optimize=True)
    print(f"SUCCESS: {new_w}x{new_h}")
except Exception as e:
    print(f"ERROR: {e}", file=sys.stderr)
    sys.exit(1)
`;
                const upscaleScriptPath = path.join(tmpDir, "upscale.py");
                await writeFile(upscaleScriptPath, pythonUpscale);
                await execPromise(`python3.11 "${upscaleScriptPath}"`);
                currentPath = upscaledPath;
            } catch (upscaleError) {
                console.warn("Upscaling failed, using current image:", upscaleError);
            }
        }

        // Copy final result
        const finalBuffer = await readFile(currentPath);
        await writeFile(finalPath, finalBuffer);

        // Upload to Supabase Storage
        const bucket = "bridgeflow-media";
        const filename = `templates/${templateSlug}-${Date.now()}.png`;

        try {
            await sb.storage.createBucket(bucket, { public: true });
        } catch {
            // Bucket already exists
        }

        const { error: uploadError } = await sb.storage
            .from(bucket)
            .upload(filename, finalBuffer, {
                contentType: "image/png",
                upsert: true,
            });

        if (uploadError) {
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data: urlData } = sb.storage.from(bucket).getPublicUrl(filename);

        // Cleanup temp files
        try {
            await unlink(inputPath).catch(() => {});
            await unlink(bgRemovedPath).catch(() => {});
            await unlink(upscaledPath).catch(() => {});
            await unlink(finalPath).catch(() => {});
        } catch { /* ignore cleanup errors */ }

        return NextResponse.json({
            ok: true,
            url: urlData.publicUrl,
            filename,
            processed: {
                bgRemoved: removeBg,
                upscaled: upscale,
            }
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Template image processing error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
