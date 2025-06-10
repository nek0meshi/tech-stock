import uuid from "@/utils/uuid";
import { create } from "zustand";

export const ALERT_VARIANTS = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
} as const;

interface ToastType {
  id: string;
  message: string;
  variant: keyof typeof ALERT_VARIANTS;
}

interface ToastStore {
  toasts: ToastType[];
  addToast: (message: string, variant: keyof typeof ALERT_VARIANTS) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message: string, variant: keyof typeof ALERT_VARIANTS) => {
    const id = uuid();
    set((prev) => ({ toasts: [...prev.toasts, { id, message, variant }] }));
    setTimeout(() => {
      set((prev) => ({
        toasts: prev.toasts.filter((toast) => toast.id !== id),
      }));
    }, 30000);

    return id;
  },
  removeToast: (id: string) => {
    set((prev) => ({
      toasts: prev.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
