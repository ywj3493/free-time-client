"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { MeetingResponseForm } from "../proposals/MeetingResponseForm";
import { ProposalAdapter } from "@/adapters/ProposalAdapter";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { getProposals } from "@/services/proposals";

export function Header() {
  const { status } = useSession();
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const { data: proposalResponse } = useSWR("/proposals/waiting", () =>
    getProposals()
  );

  const handleAlarmModalOpen = () => {
    setIsAlarmModalOpen(true);
  };

  const handleAlarmModalClose = () => {
    setIsAlarmModalOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex justify-between p-4">
      <Link href={"/users"}>마이 페이지</Link>

      <div className="flex gap-2">
        <button onClick={handleAlarmModalOpen}>알람</button>
        {isAuthenticated && <button onClick={handleSignOut}>로그아웃</button>}
      </div>
      {proposalResponse && (
        <Modal open={isAlarmModalOpen} onClose={handleAlarmModalClose}>
          <MeetingResponseForm
            proposals={proposalResponse.map(ProposalAdapter.create)}
            onClickConfirm={handleAlarmModalClose}
            onClickReject={handleAlarmModalClose}
          />
        </Modal>
      )}
    </div>
  );
}
