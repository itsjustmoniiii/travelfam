import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useTrendingUsers = () => {
  const url = "/api/trendingusers";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTrendingUsers;
