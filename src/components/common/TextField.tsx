"use client";
import { forwardRef, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftadornment?: React.ReactNode;
  rightadornment?: React.ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type, leftadornment, rightadornment, className, ...props }, ref) => {
    const isPasswordInput = type === "password";

    const [internalType, setInternalType] = useState<string>(type || "text");

    const togglePasswordVisibility = () => {
      setInternalType(internalType === "password" ? "text" : "password");
    };

    const isPassword = internalType === "password";

    return (
      <div
        className={`flex items-center gap-4 rounded-lg border border-gray-300 p-0.5 ${className}`}
      >
        {leftadornment && <div className="h-full">{leftadornment}</div>}
        <input
          ref={ref}
          {...props}
          className="m-2 w-full border-0 outline-none appearance-none"
          type={internalType}
        />
        {isPasswordInput &&
          (isPassword ? (
            <MdOutlineVisibility
              onClick={togglePasswordVisibility}
              className="mx-2 h-6 w-6 cursor-pointer text-gray-500"
            />
          ) : (
            <MdOutlineVisibilityOff
              onClick={togglePasswordVisibility}
              className="mx-2 h-6 w-6 cursor-pointer text-gray-500"
            />
          ))}
        {rightadornment && (
          <div className="flex-center flex h-4 w-4">{rightadornment}</div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
