"use client";

import useToast, { isToastVariant } from "@/client/hooks/useToast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ToastQueryHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const toastVariant = searchParams.get("toastVariant");
  const toastMessage = searchParams.get("toastMessage");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (toastVariant && isToastVariant(toastVariant) && toastMessage) {
      toast.toast(toastVariant, toastMessage);
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("toastVariant");
    newParams.delete("toastMessage");

    router.replace(`?${newParams.toString()}`);
  }, [toastVariant, toastMessage]);

  return null;
}
