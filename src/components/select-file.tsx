"use client";

import Image from "next/image";
import { handleSubmit } from "@/lib/actions";
import { fileSchema } from "@/lib/validation";
import { ChangeEvent, useActionState, useEffect, useMemo, useRef, useState } from "react";

export default function SelectFile() {
  const [state, formAction, isPending] = useActionState(handleSubmit, null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const fileURL = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (fileURL) URL.revokeObjectURL(fileURL);
    };
  }, [fileURL]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const parseResult = fileSchema.safeParse(selectedFile);

    if (parseResult.success) {
      setFile(parseResult.data);
      setError("");
    } else {
      setFile(null);
      setError(parseResult.error.issues[0].message);
      event.target.value = "";
    }
  };

  return (
    <form action={formAction}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-describedby={error || state?.error ? "file-error" : undefined}
      >
        Select File
      </button>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        name="file"
        required
      />
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
      <button type="submit" disabled={!file || !!error || isPending}>
        {isPending ? "Loading..." : "Submit"}
      </button>
      {(error || state?.error) && (
        <p id="file-error" role="alert">
          {error || state?.error}
        </p>
      )}
    </form>
  );
}
