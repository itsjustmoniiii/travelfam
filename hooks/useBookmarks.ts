import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useBookmarks = (userId?: string) => {
  const url = userId ? `/api/bookmarks/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useBookmarks;
