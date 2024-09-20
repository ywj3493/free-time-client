import fetchWithAuth from "../common";

/**
 * http://server.pickfreetime.com/swagger-ui/index.html#/%EB%B9%88%20%EC%8B%9C%EA%B0%84%20%EA%B4%80%EB%A0%A8%20API/getMyFreeTime
 * 나의 빈 시간 조회 (메인 API)
 *
 * @param start 스케줄 검색 시작 날짜
 * @param end 스케줄 검색 끝 날짜
 * @returns Promise<FreeTimeMyResponse>
 */
export async function getFreeTime({
  start,
  end,
}: {
  start: string;
  end: string;
}) {
  const params = new URLSearchParams({ start, end });

  const response = await fetchWithAuth(`/free-time?${params}`);

  console.log(response);

  return response?.json() as Promise<FreeTimeMyResponse>;
}
