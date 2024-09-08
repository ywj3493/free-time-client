import { FreeTimeUpdateForm } from "@/components/users/FreeTimeUpdateForm";
import { UserUpdateForm } from "@/components/users/UserUpdateForm";

export default function UsersPage() {
  return (
    <div className="flex">
      <UserUpdateForm />
      <FreeTimeUpdateForm />
    </div>
  );
}
