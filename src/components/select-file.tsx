"use client";

import exifr from "exifr";
import Image from "next/image";
import { handleSubmit } from "@/lib/actions";
import { fileSchema } from "@/lib/validation";
import { ChangeEvent, useActionState, useEffect, useMemo, useRef, useState } from "react";

export default function SelectFile() {
  const [state, formAction, isPending] = useActionState(handleSubmit, null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
      if (inputRef.current) inputRef.current.value = ""; // not sure if the merge of client and server errors is fine
      setFile(null);
      setLocation(null);
      setError(state.error);
    }
  }, [state]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validatedFile = fileSchema.safeParse(selectedFile);

    if (!validatedFile.success) {
      setFile(null);
      setLocation(null);
      setError(validatedFile.error.issues[0].message);
      event.target.value = "";
      return;
    }

    try {
      const gpsData = await exifr.gps(validatedFile.data);

      if (!gpsData) {
        setFile(null);
        setLocation(null);
        setError("No GPS data available");
        event.target.value = "";
        return;
      }

      setFile(validatedFile.data);
      setLocation({
        ...gpsData,
      });
      setError("");
    } catch {
      setFile(null);
      setLocation(null);
      setError("Failed to read EXIF metadata");
      event.target.value = "";
    }
  };

  const handleReset = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    setLocation(null);
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
      {location ? (
        <>
          <input type="hidden" name="latitude" value={location.latitude} />
          <input type="hidden" name="longitude" value={location.longitude} />
        </>
      ) : null}
      {fileURL ? (
        <div className="relative w-48 h-48">
          <Image
            src={fileURL}
            alt="Preview image"
            className="object-cover"
            fill
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
