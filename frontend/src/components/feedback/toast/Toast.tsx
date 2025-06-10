"use client";

import useToast from "@/client/hooks/useToast";
import ToastAlert from "./ToastAlert";

export default function Toast() {
  const { toasts } = useToast();

  return (
    <div className="toast toast-top toast-center toast-middle">
      {toasts.map((toast) => (
        <ToastAlert key={toast.id} id={toast.id} variant={toast.variant}>
          {toast.message}
        </ToastAlert>
      ))}
    </div>
  );
}
