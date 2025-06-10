import { useToastStore } from "@/client/stores/useToastStore";

export default function useToast() {
  const { toasts, addToast, removeToast } = useToastStore();

  return {
    toasts,
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
    info: (message: string) => addToast(message, "info"),
    remove: removeToast,
  };
}
