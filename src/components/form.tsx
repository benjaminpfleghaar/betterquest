"use client";

import exifr from "exifr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleSubmit } from "@/lib/actions";
import { CirclePlus, X } from "lucide-react";
import { fileSchema } from "@/lib/validation";
import { ChangeEvent, useActionState, useEffect, useMemo, useRef, useState } from "react";

export default function Form() {
  const [state, formAction, isPending] = useActionState(handleSubmit, null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const fileURL = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
    };
  }, [fileURL]);

  useEffect(() => {
    if (state?.error) resetForm(state.error);
    if (state?.slug) router.push(`/${state.slug}`);
  }, [state, router]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const validatedFile = fileSchema.safeParse(selectedFile);

    if (!validatedFile.success) {
      resetForm(validatedFile.error.issues[0].message);
      return;
    }

    try {
      const gpsData = await exifr.gps(validatedFile.data);

      if (!gpsData) {
        resetForm("No GPS data available");
        return;
      }

      setFile(validatedFile.data);
      setLocation({
        ...gpsData,
      });
      setError("");
    } catch {
      resetForm("Failed to read EXIF metadata");
    }
  };

  const resetForm = (err?: string) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setFile(null);
    setLocation(null);
    setError(err ?? "");
  };

  return (
    <div className="w-sm rounded-2xl bg-white p-4 shadow-lg">
      {fileURL ? (
        <div className="relative aspect-video overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={fileURL}
            alt="Selected photo"
            className="object-cover"
            fill
          />
          <button
            type="reset"
            className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-white text-stone-900"
            onClick={() => resetForm()}
            disabled={isPending}
          >
            <X size={16} strokeWidth={1.5} />
            <span className="sr-only">Remove photo</span>
          </button>
        </div>
      ) : null}
      {!file ? (
        <button
          type="button"
          className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-stone-100 text-sm font-medium text-stone-900"
          onClick={() => inputRef.current?.click()}
          aria-describedby={error ? "form-error" : undefined}
        >
          <CirclePlus strokeWidth={1.5} />
          Add photo
        </button>
      ) : null}
      {error ? (
        <p id="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <form action={formAction}>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handleChange}
          disabled={isPending}
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
        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
