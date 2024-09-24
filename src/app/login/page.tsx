"use client";
import { LoginForm } from "@/components/users/LoginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    redirect(`/${session.user.userId}`);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
