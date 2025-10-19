"use server";

import { redirect } from "next/navigation";
import { MIME_TYPES } from "@/lib/constants";
import { createClient } from "@/lib/supabase";
import { formSchema } from "@/lib/validation";

export const handleSubmit = async (
  _: unknown,
  formData: FormData,
): Promise<{ error: string }> => {
  const slug = Date.now().toString(36);

  try {
    const validatedForm = formSchema.safeParse({
      file: formData.get("file"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      type: formData.get("type"),
      description: formData.get("description"),
    });

    if (!validatedForm.success) {
      return { error: validatedForm.error.issues[0].message };
    }

    const { file, latitude, longitude, type, description } = validatedForm.data;

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
      type,
      description,
    });

    if (locationError) {
      return { error: locationError.message };
    }
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred. Please try again later.";

    return { error: message };
  }

  redirect(`/${slug}`);
};
