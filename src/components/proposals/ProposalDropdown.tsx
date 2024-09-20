import { ProposalAdapter } from "@/adapters/ProposalAdapter";

interface ProposalDropdownProps {
  proposals: ProposalAdapter[];
  onClickItem?: (proposal: ProposalAdapter) => void;
}

export default function ProposalDropdown({
  proposals,
  onClickItem,
}: ProposalDropdownProps) {
  return (
    <div>
      {proposals.map((proposal) => (
        <div
          key={`proposal_dropdown_${proposal.proposalId}`}
          className="px-2 py-4 border-b border-gray-400"
          onClick={() => onClickItem?.(proposal)}
        >
          {proposal.proposalSummary}
        </div>
      ))}
    </div>
  );
}
