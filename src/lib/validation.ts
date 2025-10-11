import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "image/tiff",
];

export const fileSchema = z
  .file()
  .min(1, { message: "File can not be empty" })
  .max(MAX_FILE_SIZE, { message: "File size should not exceed 3 MB" })
  .mime(ACCEPTED_FILE_TYPES, { message: "Invalid image file type" });

export const formSchema = z.object({
  file: fileSchema,
  latitude: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  description: z
    .string()
    .nonempty("Description can not be empty")
    .max(200, "The description can not have more than 200 characters"),
});
