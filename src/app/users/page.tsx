import { auth } from "@/auth";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { FreeTimeUpdateForm } from "@/components/users/FreeTimeUpdateForm";
import { UserUpdateForm } from "@/components/users/UserUpdateForm";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await auth();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 정보 수정</div>
        <UserUpdateForm />
      </section>
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 프리타임</div>
        <FreeTimeUpdateForm />
      </section>
    </div>
  );
}
