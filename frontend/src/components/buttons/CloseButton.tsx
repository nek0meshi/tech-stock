import clsx from "clsx";

const BUTTON_SIZES = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
} as const;

interface CloseButtonProps {
  size?: keyof typeof BUTTON_SIZES;
  onClick: () => void;
}

export default function CloseButton({
  size = "xs",
  onClick,
}: CloseButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "btn btn-ghost hover:bg-transparent border-none",
        BUTTON_SIZES[size],
      )}
      onClick={onClick}
    >
      ✕
    </button>
  );
}
