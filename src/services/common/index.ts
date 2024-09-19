import { getSession } from "next-auth/react";
import { baseUrl } from "..";

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

    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
