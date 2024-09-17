"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      const container = document.createElement("div");
      document.body.appendChild(container);
      setMenuContainer(container);
      document.body.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.removeChild(container);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, onClose]);

  if (!menuContainer || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="border bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    menuContainer
  );
}
