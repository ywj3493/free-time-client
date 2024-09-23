import fetchWithAuth from "../common";

/**
 * http://server.pickfreetime.com/swagger-ui/index.html#/%EB%B9%88%20%EC%8B%9C%EA%B0%84%20%EA%B4%80%EB%A0%A8%20API/getMyFreeTime
 * 나의 빈 시간 조회 (메인 API)
 *
 * @param start 스케줄 검색 시작 날짜
 * @param end 스케줄 검색 끝 날짜
 * @returns Promise<FreeTimeMyResponse>
 */
export async function getMyFreeTime({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  const params = new URLSearchParams({ start, end });

  const response = await fetchWithAuth(`/free-time?${params}`);

  return response?.json() as Promise<FreeTimeMyResponse>;
}

/**
 * http://13.209.188.152/swagger-ui/index.html#/%EB%B9%88%20%EC%8B%9C%EA%B0%84%20%EA%B4%80%EB%A0%A8%20API/getMyWeeklyFreeTime
 *
 *
 * @returns
 */
export async function getMyWeeklyFreeTime() {
  const response = await fetchWithAuth("/free-time/weekly");

  return response?.json() as Promise<FreeTimeWeeklyResponse>;
}

export async function updateWeeklyFreeTime(request: FreeTimeWeeklyRequest) {
  await fetchWithAuth("free-time/weekly", {
    method: "PUT",
    body: JSON.stringify(request),
  });
}
