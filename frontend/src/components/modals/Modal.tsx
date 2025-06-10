"use client";

import CloseButton from "@/components/buttons/CloseButton";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  actions,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-start">
            {title && <h3 className="text-2xl font-bold">{title}</h3>}
            <CloseButton size="sm" onClick={onClose} />
          </div>
          {children}
        </div>
        {actions && <div className="modal-action">{actions}</div>}
      </div>

      {/* backdropのクリック時にモーダルを閉じる */}
      <form
        method="dialog"
        className="modal-backdrop"
        onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <button type="submit">✕</button>
      </form>
    </dialog>,
    modalRoot,
  );
}
