"use client";

import exifr from "exifr";
import Image from "next/image";
import { toast } from "sonner";
import { handleSubmit } from "@/lib/actions";
import { CirclePlus, X } from "lucide-react";
import { fileSchema } from "@/lib/validation";
import TypeSelector from "@/components/type-selector";
import { ChangeEvent, useActionState, useEffect, useMemo, useRef, useState } from "react";

export default function Form() {
  const [state, formAction, isPending] = useActionState(handleSubmit, null);
  const [file, setFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
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
  }, [state]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    try {
      const validatedFile = fileSchema.safeParse(selectedFile);

      if (!validatedFile.success) {
        resetForm(validatedFile.error.issues[0].message);
        return;
      }

      const gpsData = await exifr.gps(validatedFile.data);

      if (!gpsData) {
        resetForm("No GPS data available");
        return;
      }

      setFile(validatedFile.data);
      setLocation(gpsData);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again later.";

      resetForm(message);
    }
  };

  const resetForm = (err?: string) => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setFile(null);
    setLocation(null);

    if (err) {
      toast.error(err);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4">
      {isPending ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/90 text-sm font-medium text-stone-900">
          <div className="size-5 animate-spin rounded-full border-[1.5px] border-current border-e-transparent"></div>
          Loading...
        </div>
      ) : null}
      {fileURL ? (
        <div className="relative mb-2 aspect-video overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={fileURL}
            alt="Selected photo"
            className="object-cover"
            fill
          />
          <button
            type="reset"
            className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-white text-stone-900 outline-offset-2 outline-blue-500 focus-visible:outline-2 disabled:cursor-default"
            onClick={() => resetForm()}
            disabled={isPending}
          >
            <X size={16} />
            <span className="sr-only">Remove photo</span>
          </button>
        </div>
      ) : null}
      {!file ? (
        <button
          type="button"
          className="mb-2 flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-stone-100 text-sm font-medium text-stone-900 outline-offset-2 outline-blue-500 focus-visible:outline-2"
          onClick={() => inputRef.current?.click()}
        >
          <CirclePlus strokeWidth={1.5} />
          Add photo
        </button>
      ) : null}
      <form className="space-y-4" action={formAction} ref={formRef}>
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
        <TypeSelector isPending={isPending} />
        <fieldset>
          <legend id="description" className="sr-only">
            Describe the issue
          </legend>
          <textarea
            name="description"
            className="flex field-sizing-fixed h-24 w-full resize-none rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-900 outline-offset-2 outline-blue-500 placeholder:text-stone-600 focus-visible:outline-2"
            placeholder="Describe the issue"
            aria-labelledby="description"
            disabled={isPending}
            maxLength={200}
          ></textarea>
        </fieldset>
        <button
          type="submit"
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-stone-900 text-sm font-medium text-white outline-offset-2 outline-blue-500 focus-visible:outline-2 disabled:cursor-default disabled:bg-stone-100 disabled:text-stone-500"
          disabled={!file || isPending}
        >
          Create link
        </button>
      </form>
    </div>
  );
}
