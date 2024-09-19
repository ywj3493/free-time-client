"use client";
import { LoginForm } from "@/components/users/LoginForm";
import { SessionProvider } from "next-auth/react";

export default function LoginPage() {
  return (
    <SessionProvider>
      <div className="w-screen h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </SessionProvider>
  );
}
