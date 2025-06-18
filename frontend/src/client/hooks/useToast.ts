import { useToastStore } from "@/client/stores/useToastStore";

export default function useToast() {
  const { toasts, addToast, removeToast } = useToastStore();

  return {
    toasts,
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
    info: (message: string) => addToast(message, "info"),
    toast: (
      variant: "success" | "error" | "warning" | "info",
      message: string,
    ) => addToast(message, variant),
    remove: removeToast,
  };
}

export function isToastVariant(
  variant: string,
): variant is "success" | "error" | "warning" | "info" {
  return ["success", "error", "warning", "info"].includes(variant);
}
