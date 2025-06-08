import React, { ReactNode } from "react";

type RadioGroupProps = {
  children: ReactNode;
  className?: string;
  direction?: "row" | "col";
};

export default function RadioGroup({
  children,
  className = "",
  direction = "row",
}: RadioGroupProps) {
  return (
    <div
      className={`flex flex-${direction} gap-2 ${className}`}
    >
      {children}
    </div>
  );
}
