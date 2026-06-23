import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-lingo-green text-white border-b-4 border-lingo-green-shadow active:border-b-0 active:translate-y-1 hover:bg-lingo-green/90",
  secondary:
    "bg-sky-400 text-white border-b-4 border-sky-600 active:border-b-0 active:translate-y-1 hover:bg-sky-500",
  outline:
    "bg-white text-lingo-green-dark border-2 border-gray-200 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-extrabold uppercase tracking-wide transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-extrabold uppercase tracking-wide transition-all ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
