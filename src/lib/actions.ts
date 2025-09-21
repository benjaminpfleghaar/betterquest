"use server";

import { fileSchema } from "@/lib/validation";

export const handleSubmit = async (_: unknown, formData: FormData) => {
  try {
    const selectedFile = formData.get("file") as File;
    const parseResult = fileSchema.safeParse(selectedFile);

    if (!parseResult.success) {
      return {
        error: parseResult.error.issues[0].message,
      };
    }

    const fileExt = selectedFile.name.split(".").pop();
    const filePath = `image.${fileExt}`;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const payload = {
      id: crypto.randomUUID(),
      file: selectedFile,
      filePath: filePath,
    };

    console.log(payload);
  } catch (err) {
    console.error(err);
    return { error: "An unexpected error occurred. Please try again later" };
  }
};
