"use server";

import { redirect } from "next/navigation";
import { fileSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase";

export const handleSubmit = async (_: unknown, formData: FormData) => {
  let redirectLocation;

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

    const slug = Date.now().toString(36);
    const todaysDate = new Date().toISOString().split("T")[0];

    const fileExt = file.type.split("/")[1];
    const fileName = `${todaysDate}-${slug}.${fileExt}`;

    const { data: storage, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      return {
        error: storageError.message,
      };
    }

    const { error: locationsError } = await supabase
      .from("locations")
      .insert({ slug: slug, image: storage.path });

    if (locationsError) {
      return {
        error: locationsError.message,
      };
    }

    redirectLocation = slug;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      console.error(error);
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }

  if (redirectLocation) {
    redirect(`/${redirectLocation}`);
  }
};
