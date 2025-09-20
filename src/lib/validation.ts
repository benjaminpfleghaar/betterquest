import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const fileSchema = z
  .file()
  .max(MAX_FILE_SIZE, { message: "File size should not exceed 5 MB" })
  .mime(ACCEPTED_FILE_TYPES, { message: "Invalid image file type" });
