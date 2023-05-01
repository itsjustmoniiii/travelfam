import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useSearchResults = (query?: string) => {
  const url = query ? `/api/search?q=${query}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSearchResults;
