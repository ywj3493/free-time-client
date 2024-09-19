import fetchWithAuth from "../common";

export async function getMyFreeTime({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  const params = new URLSearchParams({ start, end });

  try {
    const response = await fetchWithAuth(`/free-time?${params}`);

    if (response?.ok) return response;
  } catch (error) {
    console.log(error);
  }
}
