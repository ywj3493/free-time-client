"use client";

import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { Chip } from "../common/Chip";
import { useFieldArray, useForm } from "react-hook-form";
import { addDays } from "date-fns";
import { TextField } from "../common/TextField";
import { useSchedule } from "@/hooks/useSchedule";
import { Button } from "../common/Button";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { postProposals } from "@/services/proposals";

interface MeetingProposalFormProps {
  freeTimes: ScheduleAdapter[];
  onEmpty: () => void;
}

export function MeetingProposalForm({
  freeTimes,
  onEmpty,
}: MeetingProposalFormProps) {
  const { userId } = useParams();
  const { handleDeleteSchedule } = useSchedule();
  const { control, register, handleSubmit } = useForm<MeetingProposalFormData>({
    defaultValues: {
      targetId: +userId[0],
      schedules: freeTimes.map((freeTime) => freeTime.schedule),
      expiredAt: freeTimes.at(-1)?.schedule.end,
      description: "",
    },
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const handleSendForm = async (data: MeetingProposalFormData) => {
    await postProposals([data]);
    onEmpty();
  };

  // 스케줄 전부 지우면 자동으로 닫히도록 하는 로직을 위함
  useEffect(() => {
    if (fields.length === 0) onEmpty();
  }, [fields]);

  return (
    <form onSubmit={handleSubmit(handleSendForm)}>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div
            key={`meeting_proposal_item_${field.id}`}
            className="grid grid-cols-8 justify-center items-center place-items-center"
          >
            <Chip title={`요청 ${index + 1}`} />
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
                handleDeleteSchedule(field.scheduleId);
                remove(index);
              }}
            >
              -
            </button>
          </div>
        ))}
        <TextField
          {...register("description")}
          placeholder="어떤 약속인지 간단히 알려주세요!"
        />
        <Button>약속 요청하기</Button>
      </div>
    </form>
  );
}
