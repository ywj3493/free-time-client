export const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;
