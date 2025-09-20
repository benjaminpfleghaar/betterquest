"use client";

import Image from "next/image";
import { fileSchema } from "@/lib/validation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function SelectFile() {
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

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
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const parseResult = fileSchema.safeParse(selectedFile);

    if (parseResult.success) {
      setFile(parseResult.data);
      setError("");
    } else {
      setFile(null);
      setError(parseResult.error.issues[0].message);
      e.target.value = "";
    }
  };

  return (
    <form>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-describedby={error ? "file-error" : undefined}
      >
        Select File
      </button>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        aria-invalid={!!error}
        className="hidden"
      />
      {error && (
        <p id="file-error" role="alert">
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
