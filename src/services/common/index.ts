import { getSession } from "next-auth/react";
import { baseUrl } from "..";

async function refreshAuth(options?: RequestInit) {
  try {
    const session = await getSession();

    if (!session) throw Error("session 없음");

    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${session.refreshToken}`,
      "Content-Type": "application/json", // Content-Type을 명시적으로 설정
    };

    const response = await fetch(`${baseUrl}/users/refresh`, {
      ...options,
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default async function fetchWithAuth(
  url: string,
  options?: RequestInit
) {
  try {
    const session = await getSession();

    if (!session) throw Error("session 없음");

    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json", // Content-Type을 명시적으로 설정
    };

    let response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (!response?.ok) {
      const refreshResponse = await refreshAuth(options);

      if (refreshResponse?.ok) {
        const { accessToken, refreshToken } =
          (await refreshResponse.json()) as TokenResponse;
      }
    }

    return response;
  } catch (error) {
    console.log("error with fetchAuth");
    console.log(error);
  }
}
