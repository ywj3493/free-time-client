import fetchWithAuth from "../common";

export async function getUser() {
  const response = await fetchWithAuth("/users");

  return response?.json() as Promise<UserResponse>;
}

/**
 * http://13.209.188.152/swagger-ui/index.html#/%EC%82%AC%EC%9A%A9%EC%9E%90%20%EA%B4%80%EB%A6%AC%20API/update
 * 사용자 정보 수정
 *
 * @param request 이름, 번호, 알림채널
 * @returns
 */
export async function updateUser(request: UserUpdateRequest) {
  await fetchWithAuth("/users/update", {
    method: "PUT",
    body: JSON.stringify(request),
  });
}
