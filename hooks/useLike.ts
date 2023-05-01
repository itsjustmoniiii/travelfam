import useCurrentUser from "./useCurrentUser";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const isAlreadyLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);

  const toggleLikeOnPost = useCallback(async () => {
    try {
      if (isAlreadyLiked) {
        await axios.delete("/api/like", { data: { postId } });
      } else {
        await axios.post("/api/like", { postId });
      }

      mutateFetchedPost();
      mutateFetchedPosts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }, [postId, isAlreadyLiked, mutateFetchedPost, mutateFetchedPosts]);

  return {
    isAlreadyLiked,
    toggleLikeOnPost,
  };
};

export default useLike;
