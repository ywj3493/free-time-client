"use client";

import { useForm } from "react-hook-form";
import { TextField } from "../common/TextField";
import { days } from "@/utils";
import { Button } from "../common/Button";

interface FreeTimeUpdateFormProps {
  onSubmit: (data: FreeTimeUpdateFormData) => void;
  defaultValues?: FreeTimeWeeklyResponse;
}

export function FreeTimeUpdateForm({
  defaultValues,
  onSubmit,
}: FreeTimeUpdateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FreeTimeUpdateFormData>({
    defaultValues,
  });

  return (
    <form
      className="flex flex-col items-center w-120 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {days.map(({ eng, kor }) => {
        const engLower = eng.toLocaleLowerCase() as DayEngLower;
        return (
          <div
            key={`div_${engLower}_${kor}`}
            className="grid grid-cols-10 items-center place-items-center"
          >
            <span className="col-span-2 text-center">{kor}</span>
            <TextField
              {...register(`${engLower}.0.startHour`)}
              placeholder="18"
              className="text-sm w-10"
            />
            <span className="text-center">시</span>
            <TextField
              {...register(`${engLower}.0.startMinute`)}
              placeholder="00"
              className="text-sm w-10"
            />
            <span className="text-center">분 부터</span>
            <TextField
              {...register(`${engLower}.0.endHour`)}
              placeholder="21"
              className="text-sm w-10"
            />
            <span className="text-center">시</span>
            <TextField
              {...register(`${engLower}.0.endMinute`)}
              placeholder="00"
              className="text-sm w-10"
            />
            <span className="text-center">분 까지</span>
          </div>
        );
      })}
      <Button type="submit">수정</Button>
    </form>
  );
}
