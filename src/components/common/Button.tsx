"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-blue-300 rounded text-sm text-white font-light px-5 py-2 disabled:bg-gray-300 ${className}`}
      {...props}
    ></button>
  );
}
