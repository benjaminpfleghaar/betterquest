import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5 MB

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
    { message: "Invalid image file type" },
  )
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5 MB",
  });
