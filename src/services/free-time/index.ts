import fetchWithAuth from "../common";

export async function getMyFreeTime({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  const params = new URLSearchParams({ start, end });

  const response = await fetchWithAuth(`/free-time?${params}`);

  return response?.json();
}
