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
  disabled?: boolean;
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
  disabled = false,
  ...props
}: ButtonProps) {
  const className = useMemo(
    () =>
      clsx(
        "btn",
        buttonVariants[variant],
        buttonSizes[size],
        outline ? "btn-outline" : "",
        disabled ? "btn-disabled cursor-not-allowed" : "",
        propsClassName,
      ),
    [variant, outline, size, propsClassName, disabled],
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => disabled && e.preventDefault()}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        className={className}
        href={href}
        onClick={(e) => disabled && e.preventDefault()}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
