"use client";

import UserInfoPage from "@/components/users/UserInfoPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UsersPage() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <UserInfoPage />;
}
