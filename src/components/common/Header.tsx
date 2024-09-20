"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Modal from "./Modal";
import { MeetingResponseForm } from "../proposals/MeetingResponseForm";
import { ProposalAdapter } from "@/adapters/ProposalAdapter";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { getProposals } from "@/services/proposals";
import Dropdown from "./Dropdown";
import ProposalDropdown from "../proposals/ProposalDropdown";

export function Header() {
  const { status } = useSession();

  const alarmButtonRef = useRef(null);

  const [isAlarmDropdownOpen, setIsAlarmDropdownOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);

  const [selectedProposal, setSelectedProposal] = useState<ProposalAdapter>();

  const { data: proposalResponse } = useSWR("/proposals/waiting", () =>
    getProposals()
  );

  const handleAlarmDropdownOpen = () => {
    setIsAlarmDropdownOpen(true);
  };

  const handleAlarmDropdownClose = () => {
    setIsAlarmDropdownOpen(false);
  };

  const handleSelectProposal = (proposal: ProposalAdapter) => {
    setSelectedProposal(proposal);
    handleAlarmModalOpen();
    handleAlarmDropdownClose();
  };

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
  const proposalAdapters = proposalResponse?.map(ProposalAdapter.create);

  return (
    <div className="flex justify-between p-4">
      <Link href={"/users"}>마이 페이지</Link>

      <div className="flex gap-2">
        <button ref={alarmButtonRef} onClick={handleAlarmDropdownOpen}>
          알람
        </button>
        {proposalAdapters && (
          <Dropdown
            anchorRef={alarmButtonRef}
            open={isAlarmDropdownOpen}
            onOutsideClick={handleAlarmDropdownClose}
          >
            <ProposalDropdown
              proposals={proposalAdapters}
              onClickItem={handleSelectProposal}
            />
          </Dropdown>
        )}
        {isAuthenticated && <button onClick={handleSignOut}>로그아웃</button>}
      </div>
      {selectedProposal && (
        <Modal open={isAlarmModalOpen} onClose={handleAlarmModalClose}>
          <MeetingResponseForm
            proposal={selectedProposal}
            onSuccess={handleAlarmModalClose}
          />
        </Modal>
      )}
    </div>
  );
}
