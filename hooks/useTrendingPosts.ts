import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useTrendingPosts = () => {
  const url = "/api/trendingposts";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTrendingPosts;
