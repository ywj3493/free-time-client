import { useEffect, useState } from "react";

interface UseServerStateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export default function useServerState<T>(
  fetchFn: (...args: any) => Promise<Response | undefined>,
  options?: UseServerStateOptions<T>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setIsLoading(true);

        const response = await fetchFn();

        if (!response?.ok) {
          throw new Error("알 수 없는 에러");
        }

        const json: T = await response.json();

        setData(json);

        if (options?.onSuccess) {
          options?.onSuccess(json);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    dataFetch();
  }, []);

  return {
    isLoading,
    isError,
    data,
  };
}
