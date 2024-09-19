import { useEffect, useState } from "react";

export default function useServerState<T>(resourceUrl: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${resourceUrl}`);

        if (!response.ok) {
          throw new Error("알 수 없는 에러");
        }

        const json: T = await response.json();

        setData(json);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    dataFetch();
  }, [resourceUrl]);

  return {
    isLoading,
    isError,
    data,
  };
}
