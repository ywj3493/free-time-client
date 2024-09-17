"use client";

import { ProposalAdapter } from "@/adapters/ProposalAdapter";
import { Chip } from "../common/Chip";
import { Button } from "../common/Button";

interface MeetingResponseFormProps {
  proposal: ProposalAdapter;
  onClickConfirm?: () => void;
  onClickReject?: () => void;
}

export function MeetingResponseForm({
  proposal,
  onClickConfirm,
  onClickReject,
}: MeetingResponseFormProps) {
  const { proposalId, requesterName, schedules } = proposal;

  const handleSendAccept = () => {
    onClickConfirm?.();
  };

  const handleSendReject = () => {
    onClickReject?.();
  };

  return (
    <div className="flex flex-col">
      {schedules.map((schedule, index) => (
        <div
          key={`meeting_response_form_item_${schedule.id}`}
          className="grid grid-cols-5"
        >
          <Chip title={`요청${index + 1}`} />
          <span className="col-span-3">{schedule.scheduleText}</span>
        </div>
      ))}
      <div>
        <Button onClick={handleSendAccept}>수락</Button>
        <Button onClick={handleSendReject}>거절</Button>
      </div>
    </div>
  );
}
