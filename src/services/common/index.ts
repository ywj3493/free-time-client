import { getSession } from "next-auth/react";
import { baseUrl } from "..";

export default async function fetchWithAuth(
  url: string,
  options?: RequestInit
) {
  const session = await getSession();
  const accessToken = session?.user.accessToken;

  if (!accessToken) throw Error("accessToken 없음");

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
