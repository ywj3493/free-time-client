"use client";

import { useForm } from "react-hook-form";
import { Button } from "../common/Button";
import { TextField } from "../common/TextField";
import { getSession, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendForm = async ({ email, password }: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.ok) {
        const session = await getSession();
        if (session) {
          // 세션이 존재하면 다음 로직 수행 (예: 페이지 이동)
          router.push(`/${session.user.userId}`);
        } else {
          throw new Error("세션 갱신 실패");
        }
      }
    } catch (e) {
      alert("로그인 오류");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleSendForm)}
    >
      <label>
        계정
        <TextField
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "이메일을 형식으로 입력해주세요.",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          placeholder="계정"
        />
      </label>
      <label>
        비밀번호
        <TextField
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "비밀번호를 입력해주세요.",
            },
          })}
          placeholder="비밀번호"
        />
      </label>
      <Button>로그인</Button>
      <div className="h-0.5 w-full bg-gray-300"></div>
      <Link href={"/signup"}>회원가입</Link>
    </form>
  );
}
