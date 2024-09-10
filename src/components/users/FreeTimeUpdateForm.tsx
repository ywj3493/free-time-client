"use client";

import { useForm } from "react-hook-form";
import { TextField } from "../common/TextField";
import { days } from "@/utils";
import { Button } from "../common/Button";

export function FreeTimeUpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FreeTimeUpdateFormData>({
    defaultValues: {},
  });

  const handleSendForm = (data: FreeTimeUpdateFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col items-center w-120 gap-2"
      onSubmit={handleSubmit(handleSendForm)}
    >
      {days.map(({ eng, kor }) => (
        <div
          key={`div_${eng}_${kor}`}
          className="grid grid-cols-10 items-center place-items-center"
        >
          <span className="col-span-2 text-center">{kor}</span>
          <TextField
            {...register(`${eng}.startHour`)}
            placeholder="18"
            className="text-sm w-10"
          />
          <span className="text-center">시</span>
          <TextField
            {...register(`${eng}.startMinute`)}
            placeholder="00"
            className="text-sm w-10"
          />
          <span className="text-center">분 부터</span>
          <TextField
            {...register(`${eng}.endHour`)}
            placeholder="21"
            className="text-sm w-10"
          />
          <span className="text-center">시</span>
          <TextField
            {...register(`${eng}.endMinute`)}
            placeholder="00"
            className="text-sm w-10"
          />
          <span className="text-center">분 까지</span>
        </div>
      ))}
      <Button type="submit">수정</Button>
    </form>
  );
}
