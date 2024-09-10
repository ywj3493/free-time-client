"use client";

import { useState } from "react";

interface MeetingProposalFormProps {
  freeTime: Schedule;
}

export function MeetingProposalForm({ freeTime }: MeetingProposalFormProps) {
  const { start, end } = freeTime;
  const [formData, setFormData] = useState();
  return <form></form>;
}
