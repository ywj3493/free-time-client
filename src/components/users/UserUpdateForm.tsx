"use client";

import { useForm } from "react-hook-form";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";

export function UserUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserUpdateFormData>({
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
      className="flex flex-col justify-center items-center w-64 gap-2"
      onSubmit={handleSubmit(handleSendForm)}
    >
      <TextField
        type="text"
        {...register("name", { required: true })}
        placeholder="이름"
        className="w-full text-sm p-4"
      />
      <TextField
        type="text"
        {...register("phone", {
          required: true,
          pattern: /^01[016789]\d{3,4}\d{4}$/,
        })}
        placeholder="연락처"
        className="w-full text-sm p-4"
      />

      <div className="flex w-full items-center gap-4 rounded-lg border border-gray-300 p-2 text-sm justify-between">
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
      <Button type="submit" className="w-64" disabled={!isValid}>
        수정
      </Button>
    </form>
  );
}
