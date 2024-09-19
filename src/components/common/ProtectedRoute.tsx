import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode | ReactNode[];
}

export default async function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const session = await auth();

  if (!session?.user.userId) {
    redirect("/login");
  }

  return <>{children}</>;
}
