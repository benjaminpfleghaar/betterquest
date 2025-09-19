"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectFile() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setImage(fileURL);

    return () => URL.revokeObjectURL(fileURL);
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
  };

  const handleReset = () => {
    setFile(null);
    setImage("");
  };

  return (
    <div>
      <form>
        <input type="file" accept="image/*" onChange={handleChange} />
        {image && (
          <div className="relative w-48 h-48">
            <Image src={image} alt="Upload" fill={true} objectFit="cover" />
          </div>
        )}
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
