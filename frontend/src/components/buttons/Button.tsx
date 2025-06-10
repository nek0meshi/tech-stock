import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo } from "react";
interface ButtonProps {
  children: ReactNode;
  className?: string;
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
  className: propsClassName,
  type = "button",
  variant = "primary",
  size = "sm",
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
        propsClassName,
      ),
    [variant, outline, size, propsClassName],
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
