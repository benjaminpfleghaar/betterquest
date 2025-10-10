import Link from "next/link";
import { cn } from "@/lib/utils";
import { jakarta } from "@/lib/fonts";

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
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5811 14.1292H15.4189L11 6.08995H17.6971L21.393 12.8127C23.17 16.045 20.8326 20 17.1453 20H4.85468C1.16744 20 -1.16997 16.045 0.606992 12.8127L7.6508 0H14.3467L6.5811 14.1292Z"
            fill="white"
          />
        </svg>
      </div>
      <span
        className={`${jakarta.className} text-xl font-bold tracking-tighter`}
      >
        betterquest
      </span>
    </Link>
  );
}
