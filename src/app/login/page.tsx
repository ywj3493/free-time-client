"use client";
import { LoginForm } from "@/components/users/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push(`/${session.user.userId}`);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
