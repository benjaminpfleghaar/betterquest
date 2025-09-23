"use server";

import { redirect } from "next/navigation";
import { fileSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase";

export const handleSubmit = async (
  _: unknown,
  formData: FormData,
): Promise<{ error: string } | void> => {
  let success = false;
  const slug = Date.now().toString(36); // unique identifier for url and file name

  try {
    const file = formData.get("file") as File;
    const parseFile = fileSchema.safeParse(file);

    if (!parseFile.success) {
      return {
        error: parseFile.error.issues[0].message,
      };
    }

    const supabase = await createClient();

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(`${slug}.${file.type.split("/")[1]}`, file);

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

    success = true;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }

  if (success) {
    redirect(`/${slug}`);
  }
};
