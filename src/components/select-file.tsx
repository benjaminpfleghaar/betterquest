"use client";

import Image from "next/image";
import { imageSchema } from "@/lib/validation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectFile() {
  const [file, setFile] = useState<File | undefined>();
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageURL(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const result = imageSchema.safeParse(selectedFile);

      if (result.success) {
        setFile(result.data);
        setError("");
      } else {
        setError(result.error.issues[0].message);
      }
    }
  };

  return (
    <form>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        aria-invalid={!!error}
      />
      {error && (
        <p className="font-bold text-red-500" role="alert">
          {error}
        </p>
      )}
      {imageURL && (
        <div className="relative w-48 h-48">
          <Image
            src={imageURL}
            alt="Preview image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </form>
  );
}
