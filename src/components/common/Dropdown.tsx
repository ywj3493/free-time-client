import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  open: boolean;
  onOutsideClick: () => void;
  children?: ReactNode | ReactNode[];
}

export default function Dropdown({
  anchorRef,
  open,
  onOutsideClick,
  children,
}: DropdownProps) {
  const [menuContainer, setMenuContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const current = anchorRef.current;
    if (current && open) {
      const container = document.createElement("div");
      current.appendChild(container);
      setMenuContainer(container);
      return () => {
        if (current) {
          current.removeChild(container);
        }
      };
    }
  }, [anchorRef, open]);

  if (!menuContainer) return null;

  return createPortal(
    <>
      <div
        className="fixed flex justify-center inset-0 z-9"
        onClick={onOutsideClick}
      />
      <div className="fixed right-0 text-sm m-2 z-10 bg-white whitespace-nowrap overflow-hidden">
        {children}
      </div>
    </>,
    menuContainer
  );
}
