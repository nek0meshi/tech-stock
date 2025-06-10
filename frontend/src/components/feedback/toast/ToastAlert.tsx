"use client";

import useToast from "@/client/hooks/useToast";
import CloseButton from "@/components/buttons/CloseButton";
import clsx from "clsx";
import type { ReactNode } from "react";

const ALERT_VARIANTS = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
} as const;

interface ToastAlertProps {
  id: string;
  variant: keyof typeof ALERT_VARIANTS;
  children: ReactNode;
}

export default function ToastAlert({ id, variant, children }: ToastAlertProps) {
  const toast = useToast();
  const className = clsx("alert", ALERT_VARIANTS[variant]);

  return (
    <div className={className}>
      <span>{children}</span>
      <CloseButton size="xs" onClick={() => toast.remove(id)} />
    </div>
  );
}
