"use client";

import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { useState } from "react";
import { Chip } from "../common/Chip";
import {
  Control,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { addDays } from "date-fns";
import { TextField } from "../common/TextField";
import { useSchedule } from "@/hooks/useSchedule";
import { Button } from "../common/Button";

interface MeetingProposalFormProps {
  freeTimes: ScheduleAdapter[];
}

export function MeetingProposalForm({ freeTimes }: MeetingProposalFormProps) {
  const { handleDeleteSchedule } = useSchedule();
  const { control, register, handleSubmit } = useForm<MeetingProposalFormData>({
    defaultValues: {
      targetId: 1,
      schedules: freeTimes.map((freeTime) => freeTime.schedule),
      expiredAt: addDays(new Date(), 7).toISOString(),
      description: "",
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const handleSendForm = (data: MeetingProposalFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSendForm)}>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div
            key={`meeting_proposal_item_${field.id}`}
            className="grid grid-cols-8 justify-center items-center place-items-center"
          >
            <Chip title={`요청 ${index}`} />
            <div className="col-span-2">{field.start.split("T")[0]}</div>
            <TextField
              className="col-span-2"
              {...register(`schedules.${index}.start`)}
            />
            <TextField
              className="col-span-2"
              {...register(`schedules.${index}.end`)}
            />
            <button
              type="button"
              className="bg-blue-400 px-2 text-lg text-white rounded-full"
              onClick={() => {
                handleDeleteSchedule(field.id);
                remove(index);
              }}
            >
              -
            </button>
          </div>
        ))}
        <Button>약속 요청하기</Button>
      </div>
    </form>
  );
}
