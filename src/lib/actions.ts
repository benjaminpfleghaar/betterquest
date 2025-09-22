"use server";

import { fileSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase";

export const handleSubmit = async (_: unknown, formData: FormData) => {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        error: "No file selected",
      };
    }

    const parseResult = fileSchema.safeParse(file);

    if (!parseResult.success) {
      return {
        error: parseResult.error.issues[0].message,
      };
    }

    const supabase = await createClient();

    const uniqueId = Date.now().toString(36);
    const todaysDate = new Date().toISOString().split("T")[0];

    const fileExt = file.type.split("/")[1];
    const fileName = `${todaysDate}-${uniqueId}.${fileExt}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      return {
        error: storageError.message,
      };
    }

    const { error: tableError } = await supabase
      .from("links")
      .insert({ url: uniqueId, image: storageData.path });

    if (tableError) {
      return {
        error: tableError.message,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      console.error(error);
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
};
