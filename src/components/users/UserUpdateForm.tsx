"use client";

import { useForm } from "react-hook-form";

export function UserUpdateForm() {
  const { register, handleSubmit } = useForm<UserUpdateFormData>({
    defaultValues: {
      name: "",
      phone: "",
      preferredNoticeChannel: "EMAIL",
    },
  });

  const handleSendForm = (data: UserUpdateFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-96"
      onSubmit={handleSubmit(handleSendForm)}
    >
      <div className="flex w-full justify-between">
        이름
        <input {...register("name", { required: true })} />
      </div>

      <div className="flex w-full justify-between">
        연락처
        <input
          {...register("phone", {
            required: true,
            pattern: /^01[016789]\d{3,4}\d{4}$/,
          })}
        />
      </div>

      <div className="flex w-full justify-between">
        알림채널
        <div className="grid grid-flow-col gap-2">
          <input
            type="radio"
            value="EMAIL"
            {...register("preferredNoticeChannel", { required: true })}
          />
          이메일
          <input
            type="radio"
            value="SMS"
            {...register("preferredNoticeChannel", { required: true })}
          />
          SMS
        </div>
      </div>
      <button type="submit">수정</button>
    </form>
  );
}
