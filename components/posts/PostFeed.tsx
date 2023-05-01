import React from "react";
import Post from "./Post";
import usePosts from "@/hooks/usePosts";
import { ClipLoader } from "react-spinners";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      {posts.length === 0 && (
        <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
          <p>There are currently no posts</p>
        </div>
      )}
      {Array.isArray(posts) &&
        posts.map((post: Record<string, any>) => (
          <div key={post.id} className="mb-4">
            <Post userId={userId} data={post} />
          </div>
        ))}
    </>
  );
};

export default PostFeed;
