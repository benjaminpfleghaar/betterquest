"use server";

import { redirect } from "next/navigation";
import { fileSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase";

const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/heic": "heic",
  "image/heif": "heif",
  "image/tiff": "tiff",
};

export const handleSubmit = async (
  _: unknown,
  formData: FormData,
): Promise<{ error?: string }> => {
  const slug = Date.now().toString(36); // unique identifier for url and file name

  try {
    const latitude = (formData.get("latitude") ?? 0) as number;
    const longitude = (formData.get("longitude") ?? 0) as number;

    const validatedFile = fileSchema.safeParse(formData.get("file"));

    if (!validatedFile.success) {
      return { error: validatedFile.error.issues[0].message };
    }

    const file = validatedFile.data;
    const ext = mimeToExt[file.type] ?? "bin";
    const fileName = `${slug}.${ext}`;

    const supabase = await createClient();

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      return { error: storageError.message };
    }

    const { error: locationError } = await supabase
      .from("locations")
      .insert({ slug, image: storage.path, latitude, longitude });

    if (locationError) {
      return { error: locationError.message };
    }
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "An unexpected error occurred. Please try again later." };
  }

  redirect(`/${slug}`);
};
