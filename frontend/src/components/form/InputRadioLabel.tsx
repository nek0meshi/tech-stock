import type { ReactElement } from "react";

interface InputRadioLabelProps {
  children: ReactElement<HTMLInputElement>;
  label: string;
}

export default function InputRadioLabel({
  children,
  label,
}: InputRadioLabelProps) {
  return (
    <>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label className="label">
        {children}
        <span className="label-text">{label}</span>
      </label>
    </>
  );
}
