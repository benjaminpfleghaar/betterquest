"use client";

import Image from "next/image";
import { handleSubmit } from "@/lib/actions";
import { fileSchema } from "@/lib/validation";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  useEffect(() => {
    if (state?.error) {
      if (inputRef.current) inputRef.current.value = "";
      setFile(null);
      setError(state.error);
    }
  }, [state]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const parseResult = fileSchema.safeParse(selectedFile);

    if (!parseResult.success) {
      setFile(null);
      setError(parseResult.error.issues[0].message);
    } else {
      setFile(parseResult.data);
      setError("");
    }
  };

  const handleReset = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    setError("");
  };

  return (
    <form action={formAction}>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        name="file"
        required
      />
      {fileURL ? (
        <div className="relative w-48 h-48">
          <Image
            src={fileURL}
            alt="Preview image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
      {file ? (
        <div className="space-x-4">
          <button type="reset" onClick={handleReset} disabled={isPending}>
            Reset
          </button>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-describedby={error ? "form-error" : undefined}
        >
          Select File
        </button>
      )}
      {error ? (
        <p id="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
