"use server";

import { MIME_TYPES } from "@/lib/constants";
import { createClient } from "@/lib/supabase";
import { formSchema } from "@/lib/validation";

export const handleSubmit = async (
  _: unknown,
  formData: FormData,
): Promise<{ error?: string; slug?: string }> => {
  try {
    const validatedForm = formSchema.safeParse({
      file: formData.get("file"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      description: formData.get("description"),
    });

    if (!validatedForm.success) {
      return { error: validatedForm.error.issues[0].message };
    }

    const { file, latitude, longitude, description } = validatedForm.data;

    const slug = Date.now().toString(36);
    const ext = MIME_TYPES[file.type] ?? "bin";
    const fileName = `${slug}.${ext}`;

    const supabase = await createClient();

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      return { error: storageError.message };
    }

    const { error: locationError } = await supabase.from("locations").insert({
      slug,
      image: storage.path,
      latitude,
      longitude,
      description,
    });

    if (locationError) {
      return { error: locationError.message };
    }

    return { slug };
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
