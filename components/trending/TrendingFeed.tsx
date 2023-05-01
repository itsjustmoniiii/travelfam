import useCurrentUser from "@/hooks/useCurrentUser";
import useTrendingPosts from "@/hooks/useTrendingPosts";
import { useEffect, useState } from "react";
import Post from "../posts/Post";
import Button from "../Button";
import TrendingPosts from "./TrendingPosts";
import TrendingUsers from "./TrendingUsers";

const TrendingFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const [showTrendingPosts, setShowTrendingPosts] = useState(true);

  return (
    <div>
      <div className="flex gap-3 mb-4 items-center">
        <Button
          secondary={!showTrendingPosts}
          label="Top 10 Trending Posts"
          onClick={() => setShowTrendingPosts(true)}
        />
        <Button
          secondary={showTrendingPosts}
          label="Top 10 Trending Users"
          onClick={() => setShowTrendingPosts(false)}
        />
      </div>
      {showTrendingPosts && <TrendingPosts />}
      {!showTrendingPosts && <TrendingUsers />}
    </div>
  );
};

export default TrendingFeed;
