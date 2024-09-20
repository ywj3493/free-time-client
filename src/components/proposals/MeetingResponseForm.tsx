"use client";

import { ProposalAdapter } from "@/adapters/ProposalAdapter";
import { Chip } from "../common/Chip";
import { Button } from "../common/Button";

interface MeetingResponseFormProps {
  proposals: ProposalAdapter[];
  onClickConfirm?: () => void;
  onClickReject?: () => void;
}

export function MeetingResponseForm({
  proposals,
  onClickConfirm,
  onClickReject,
}: MeetingResponseFormProps) {
  const handleSendAccept = () => {
    onClickConfirm?.();
  };

  const handleSendReject = () => {
    onClickReject?.();
  };

  return (
    <div className="flex flex-col">
      {proposals.map((proposal, proposalIndex) => {
        const { schedules } = proposal;

        return (
          <div
            key={`meeting_response_form_item_${proposal.proposalId}`}
            className="grid grid-cols-5"
          >
            <Chip title={`요청${proposalIndex + 1}`} />
            {schedules.map((schedule) => (
              <span
                key={`meeting_response_form_item_schedules_${schedule.id}`}
                className="col-span-3"
              >
                {schedule.scheduleText}
              </span>
            ))}
          </div>
        );
      })}
      <div>
        <Button onClick={handleSendAccept}>수락</Button>
        <Button onClick={handleSendReject}>거절</Button>
      </div>
    </div>
  );
}
