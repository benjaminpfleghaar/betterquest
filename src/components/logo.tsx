import Image from "next/image";

const logo = {
  lime: "logo-lime-200",
  stone: "logo-stone-900",
};

export default function Logo({ variant }: { variant: "lime" | "stone" }) {
  return (
    <Image
      src={`/${logo[variant]}.svg`}
      width={140}
      height={20}
      alt="betterquest"
    />
  );
}
