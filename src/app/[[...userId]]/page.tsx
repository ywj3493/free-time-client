import { auth } from "@/auth";
import FreeTime from "@/components/free-time/FreeTime";
import { redirect } from "next/navigation";

export default async function FreeTimePage({
  params,
}: {
  params: { userId: string };
}) {
  const userId = params.userId;

  const session = await auth();

  // 로그인 하지 않았을 때 로그인 화면으로 라우팅
  if (!session) {
    redirect("/login");
  }

  // root 페이지 값 userId 없을 때, 자기 자신 값으로 라우팅
  if (!userId || userId.length > 1) {
    redirect(`/${session.user.userId}`);
  }

  return <FreeTime userId={userId} />;
}
