import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
interface ButtonProps {
  children: ReactNode;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void | Promise<void>;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "error";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
}

const buttonVariants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  error: "btn-error",
} as const;

const buttonSizes = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
} as const;

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  outline = false,
  href,
  isExternal = false,
  onClick,
  ...props
}: ButtonProps) {
  const className = useMemo(
    () =>
      clsx(
        "btn",
        buttonVariants[variant],
        buttonSizes[size],
        outline ? "btn-outline" : "",
      ),
    [variant, outline, size],
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={className} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
}
