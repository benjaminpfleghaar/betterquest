"use client";

import Image from "next/image";
import { fileSchema } from "@/lib/validation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectFile() {
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setFileURL("");
      return;
    }

    const url = URL.createObjectURL(file);
    setFileURL(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputField = e.target;
    const selectedFile = inputField.files?.[0];

    if (selectedFile) {
      const result = fileSchema.safeParse(selectedFile);

      if (result.success) {
        setFile(result.data);
        setError("");
      } else {
        setFile(null);
        setError(result.error.issues[0].message);
        inputField.value = "";
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
      {fileURL && (
        <div className="relative w-48 h-48">
          <Image
            src={fileURL}
            alt="Preview image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <button type="submit" disabled={!file || !!error}>
        Submit
      </button>
    </form>
  );
}
