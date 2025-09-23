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
    const validatedFile = fileSchema.safeParse(formData.get("file"));

    if (!validatedFile.success) {
      return {
        error: validatedFile.error.issues[0].message,
      };
    }

    const supabase = await createClient();

    const ext = mimeToExt[validatedFile.data.type] ?? "bin";
    const fileName = `${slug}.${ext}`;

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, validatedFile.data);

    if (storageError) {
      return {
        error: storageError.message,
      };
    }

    const { error: locationError } = await supabase
      .from("locations")
      .insert({ slug: slug, image: storage.path });

    if (locationError) {
      return {
        error: locationError.message,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }

  redirect(`/${slug}`);
};
