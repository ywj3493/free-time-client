"use client";

import { ProposalAdapter } from "@/adapters/ProposalAdapter";
import { Chip } from "../common/Chip";
import { Button } from "../common/Button";
import { ChangeEvent, useState } from "react";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { acceptProposal, rejectProposal } from "@/services/proposals";
import { TextField } from "../common/TextField";

interface MeetingResponseFormProps {
  proposal: ProposalAdapter;
  onSuccess: () => void;
}

export function MeetingResponseForm({
  proposal,
  onSuccess,
}: MeetingResponseFormProps) {
  const { schedules } = proposal;

  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleAdapter>(
    schedules[0]
  );
  const [description, setDescription] = useState<string>("");

  const handleDescriptionInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSendAccept = async () => {
    try {
      const response = await acceptProposal(proposal.proposalId, {
        schedule: selectedSchedule.schedule,
        description: "",
      });

      if (response?.ok) {
        onSuccess();
      }
    } catch (error) {}
  };

  const handleSendReject = async () => {
    try {
      const response = await rejectProposal(proposal.proposalId);

      if (response?.ok) {
        onSuccess();
      }
    } catch (error) {}
  };

  const handleSelectSchedule = (schedule: ScheduleAdapter) => {
    setSelectedSchedule(schedule);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>{proposal.proposalSummary}</div>
      {schedules.map((schedule, index) => (
        <div
          key={`meeting_response_form_item_${schedule.id}`}
          className="grid grid-cols-4 gap-4 items-center"
        >
          <Chip
            className="col-span-1"
            title={`요청${index + 1}`}
            onClick={() => handleSelectSchedule(schedule)}
            isSelected={selectedSchedule.id === schedule.id}
          />
          <span className="col-span-3">{schedule.scheduleText}</span>
        </div>
      ))}
      <TextField
        className="w-full"
        placeholder="약속에 대한 메모를 남겨보세요."
        value={description}
        onChange={handleDescriptionInputChange}
      />
      <div className="w-full grid grid-cols-2 place-items-center">
        <Button onClick={handleSendAccept}>수락</Button>
        <Button onClick={handleSendReject}>거절</Button>
      </div>
    </div>
  );
}
