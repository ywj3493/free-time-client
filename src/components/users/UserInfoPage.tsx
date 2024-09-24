import {
  getMyWeeklyFreeTime,
  updateWeeklyFreeTime,
} from "@/services/free-time";
import { getUser, updateUser } from "@/services/users";
import useSWR from "swr";
import { UserUpdateForm } from "../users/UserUpdateForm";
import { FreeTimeUpdateForm } from "../users/FreeTimeUpdateForm";

export default function UserInfoPage() {
  const {
    data: userResponse,
    isLoading: isUserResponseLoading,
    mutate: userResponseMutate,
  } = useSWR("/users", getUser);

  const {
    data: freeTimeResponse,
    isLoading: isFreeTimeResponseLoading,
    mutate: freeTimeResponseMutate,
  } = useSWR("/free-time/weekly", getMyWeeklyFreeTime);

  const handleUserUpdateFormSubmit = async (data: UserUpdateFormData) => {
    const response = await updateUser(data);
    if (response?.ok) {
      alert("수정 성공");
      userResponseMutate();
    }
  };

  const handleFreeTimeUpdateFormSubmit = async (
    data: FreeTimeUpdateFormData
  ) => {
    const response = await updateWeeklyFreeTime(data);
    if (response?.ok) {
      alert("수정 성공");
      freeTimeResponseMutate();
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 정보 수정</div>
        {!isUserResponseLoading && (
          <UserUpdateForm
            defaultValues={userResponse}
            onSubmit={handleUserUpdateFormSubmit}
          />
        )}
      </section>
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 프리타임</div>
        {!isFreeTimeResponseLoading && (
          <FreeTimeUpdateForm
            defaultValues={freeTimeResponse}
            onSubmit={handleFreeTimeUpdateFormSubmit}
          />
        )}
      </section>
    </div>
  );
}
