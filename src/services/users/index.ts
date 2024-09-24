import { baseUrl } from "..";
import fetchWithAuth from "../common";

/**
 * http://13.209.188.152/swagger-ui/index.html#/%EC%82%AC%EC%9A%A9%EC%9E%90%20%EA%B4%80%EB%A6%AC%20API/getUser
 * 사용자 조회
 *
 * @returns Promise<UserResponse>
 */
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
  const response = await fetchWithAuth("/users/update", {
    method: "PUT",
    body: JSON.stringify(request),
  });

  return response;
}

/**
 * http://13.209.188.152/swagger-ui/index.html#/%EC%82%AC%EC%9A%A9%EC%9E%90%20%EA%B4%80%EB%A6%AC%20API/register
 * 사용자 등록
 *
 * @param request 이름, 메일, 비밀번호, 폰번호, 알림 채널
 */
export async function registerUser(request: UserCreateRequest) {
  const response = await fetch(`${baseUrl}/users/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return response;
}
