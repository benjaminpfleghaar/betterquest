import Image from "next/image";

interface ToggleButtonProps {
  img: string;
  label: string;
  onClick: () => void;
}

export default function ToggleButton({
  img,
  label,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      className="absolute right-6 -bottom-6 flex size-16 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-white outline-blue-500 focus-visible:outline-2"
      onClick={onClick}
    >
      <Image src={img} className="object-cover" fill alt="" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
