import { getSession } from "next-auth/react";
import { baseUrl } from "..";

export default async function fetchWithAuth(
  url: string,
  options?: RequestInit
) {
  try {
    console.log("fetchWithAuth");
    const session = await getSession();

    if (!session) throw Error("session 없음");

    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };

    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
}
