import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "destructive";
  className?: string;
}

const logo = {
  default: {
    icon: "bg-stone-900",
    label: "text-stone-900",
  },
  destructive: {
    icon: "bg-red-500",
    label: "text-white",
  },
};

export default function Logo({ className, variant = "default" }: LogoProps) {
  const { icon, label } = logo[variant];

  return (
    <Link
      href="/"
      className={cn(className, "inline-flex items-center gap-3", label)}
    >
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-lg",
          icon,
        )}
      >
        <Image src="/logo.svg" width={22} height={20} alt="" />
      </div>
      <span className="text-xl font-bold tracking-tighter">betterquest</span>
    </Link>
  );
}
