import fetchWithAuth from "../common";

/**
 * http://server.pickfreetime.com/swagger-ui/index.html#/%EB%AF%B8%ED%8C%85%20%EC%A0%9C%EC%95%88%20API/findAllProposalReceiveWaiting
 * 나의 대기중이며, 유효한 미팅 제안 조회
 *
 * @returns Promise<ProposalResponse[]>
 */
export async function getProposals() {
  const response = await fetchWithAuth("/proposals");

  return response?.json() as Promise<ProposalResponse[]>;
}

/**
 * http://server.pickfreetime.com/swagger-ui/index.html#/%EB%AF%B8%ED%8C%85%20%EC%A0%9C%EC%95%88%20API/createProposal
 *  미팅 제안 생성
 *
 * @param requests 미팅 제안 내용
 */
export async function postProposals(requests: ProposalCreateRequest[]) {
  await fetchWithAuth("/proposals", {
    method: "POST",
    body: JSON.stringify(requests),
  });
}
