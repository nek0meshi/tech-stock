import type { ChangeEvent, InputHTMLAttributes } from "react";

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRadio({
  name,
  value,
  onChange,
  ...props
}: InputRadioProps): React.ReactElement<HTMLInputElement> {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      onChange={onChange}
      className="radio radio-primary radio-sm ml-2"
      {...props}
    />
  );
}
