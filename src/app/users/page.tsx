import { FreeTimeUpdateForm } from "@/components/users/FreeTimeUpdateForm";
import { UserUpdateForm } from "@/components/users/UserUpdateForm";

export default function UsersPage() {
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
