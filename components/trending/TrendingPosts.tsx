import useCurrentUser from "@/hooks/useCurrentUser";
import useTrendingPosts from "@/hooks/useTrendingPosts";
import { useEffect } from "react";
import Post from "../posts/Post";
import { ClipLoader } from "react-spinners";

const TrendingPosts = () => {
  const { data: fetchedTrendingPosts = [], isLoading } = useTrendingPosts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (fetchedTrendingPosts?.length === 0) {
    return (
      <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
        <p>There are currently no trending posts</p>
      </div>
    );
  }

  return (
    <div>
      {fetchedTrendingPosts?.map((trend: Record<string, any>) => (
        <div key={trend.id} className="mb-3">
          <Post data={trend} />
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
