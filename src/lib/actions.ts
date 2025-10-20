"use server";

import { MIME_TYPES } from "@/lib/constants";
import { createClient } from "@/lib/supabase";
import { formSchema } from "@/lib/validation";

type SubmitState = {
  success: boolean;
  message: string;
};

export const handleSubmit = async (
  _: SubmitState,
  formData: FormData,
): Promise<SubmitState> => {
  try {
    const validatedForm = formSchema.safeParse({
      file: formData.get("file"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      type: formData.get("type"),
      description: formData.get("description"),
    });

    if (!validatedForm.success) {
      return { success: false, message: validatedForm.error.issues[0].message };
    }

    const { file, latitude, longitude, type, description } = validatedForm.data;

    const slug = Date.now().toString(36);
    const ext = MIME_TYPES[file.type] ?? "bin";
    const fileName = `${slug}.${ext}`;

    const supabase = await createClient();

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      return { success: false, message: storageError.message };
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
      return { success: false, message: locationError.message };
    }

    return { success: true, message: `/${slug}` };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred. Please try again later.";

    return { success: false, message: message };
  }
};
