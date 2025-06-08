import type { ReactElement } from "react";

interface InputLabelProps {
  label: string;
  children: ReactElement<HTMLInputElement>;
  error?: string;
}

const InputLabel = ({ label, children, error }: InputLabelProps) => {
  return (
    <div>
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label className="label flex flex-col items-start">
        <span className="text-sm">{label}</span>
        {children}
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputLabel;
