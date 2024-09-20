import { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  isSelected?: boolean;
}

export function Chip({
  title,
  className,
  isSelected,
  onClick,
  ...props
}: ChipProps) {
  return (
    <div
      className={`text-white text-sm rounded-full px-4 py-1 text-center ${className} ${
        isSelected ? "bg-blue-400" : "bg-gray-400"
      } ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      {...props}
    >
      {title}
    </div>
  );
}
