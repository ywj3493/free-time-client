"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { MeetingResponseForm } from "../proposals/MeetingResponseForm";
import { ProposalAdapter } from "@/adapters/ProposalAdapter";

const exampleProposalResponse: ProposalResponse = {
  proposalId: 1,
  requesterId: 101,
  requesterName: "John Doe",
  schedules: [
    {
      start: "2024-09-10T10:00:00",
      end: "2024-09-10T11:00:00",
    },
    {
      start: "2024-09-11T14:00:00",
      end: "2024-09-11T15:00:00",
    },
  ],
  expiredAt: "2024-09-15T23:59:59",
  status: "WAITING", // ProposalStatus 타입에 정의된 상태 중 하나
};

export function Header() {
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);

  const handleAlarmModalOpen = () => {
    console.log("tes");
    setIsAlarmModalOpen(true);
  };

  const handleAlarmModalClose = () => {
    setIsAlarmModalOpen(false);
  };

  return (
    <div className="flex justify-between p-4">
      <Link href={"/users"}>마이 페이지</Link>

      <button onClick={handleAlarmModalOpen}>알람</button>
      <Modal open={isAlarmModalOpen} onClose={handleAlarmModalClose}>
        <MeetingResponseForm
          proposal={ProposalAdapter.create(exampleProposalResponse)}
          onClickConfirm={handleAlarmModalClose}
          onClickReject={handleAlarmModalClose}
        />
      </Modal>
    </div>
  );
}
