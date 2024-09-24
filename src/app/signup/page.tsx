"use client";

import { UserRegisterForm } from "@/components/users/UserRegisterForm";
import { registerUser } from "@/services/users";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push(`/${session.user.userId}`);
  }

  const handleSendRegisterFormData = async (data: UserRegisterFormData) => {
    const response = await registerUser(data);

    if (response.ok) {
      const { email, password } = data;
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResponse?.ok) {
        const session = await getSession();
        if (session) {
          // 세션이 존재하면 다음 로직 수행 (예: 페이지 이동)
          router.push(`/${session.user.userId}`);
        } else {
          throw new Error("세션 갱신 실패");
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <UserRegisterForm onSubmit={handleSendRegisterFormData} />
    </div>
  );
}
