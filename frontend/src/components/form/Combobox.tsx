import clsx from "clsx";
import { useState } from "react";

export default function Combobox({
  placeholder,
  options,
  className,
  onEnter,
}: {
  placeholder: string;
  options: string[];
  className?: string;
  onEnter: (input: string) => void;
}) {
  const [input, setInput] = useState("");

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={clsx("input", className)}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter(input);
          e.preventDefault();
        }
      }}
    />
  );
}
