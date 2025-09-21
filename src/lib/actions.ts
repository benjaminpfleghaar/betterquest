"use server";

import { fileSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase";

export const handleSubmit = async (_: unknown, formData: FormData) => {
  try {
    const supabase = await createClient();
    const selectedFile = formData.get("file") as File;
    const parseResult = fileSchema.safeParse(selectedFile);

    if (!parseResult.success) {
      return {
        error: parseResult.error.issues[0].message,
      };
    }

    const today = new Date().toISOString().split("T")[0];
    const fileExt = selectedFile.name.split(".").pop();
    const filePath = `${today}.${fileExt}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from("images")
      .upload(filePath, selectedFile);

    if (storageError) {
      return {
        error: storageError.message,
      };
    }

    const { error: linkError } = await supabase
      .from("links")
      .insert({ url: crypto.randomUUID(), image: storageData.fullPath });

    if (linkError) {
      return {
        error: linkError.message,
      };
    }
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred. Please try again later" };
  }
};
