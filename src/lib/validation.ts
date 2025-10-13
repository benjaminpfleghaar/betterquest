import { z } from "zod";
import { FILE } from "@/lib/constants";

export const fileSchema = z
  .file()
  .min(1, { message: "File can not be empty" })
  .max(FILE.MAX_SIZE, { message: "File size should not exceed 3 MB" })
  .mime(FILE.ACCEPTED_TYPES, { message: "Invalid image file type" });

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
