import clsx from "clsx";
import { useState } from "react";

export default function Combobox({
  value,
  onChange,
  placeholder,
  options,
  className,
  onEnter,
}: {
  value: string;
  onChange: (input: string) => void;
  placeholder: string;
  options: string[];
  className?: string;
  onEnter: (input: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={clsx("input", className)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(value);
            e.preventDefault();
          }
        }}
      />
      <div className="dropdown dropdown-end">
        <div className="dropdown-content">
          {options.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </div>
      </div>
    </>
  );
}
