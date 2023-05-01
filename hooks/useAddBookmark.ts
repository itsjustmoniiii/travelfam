import useCurrentUser from "./useCurrentUser";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useBookmarks from "./useBookmarks";

const useAddBookmark = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { mutate: mutateFetchedBookmarks } = useBookmarks(currentUser?.id);

  const isAlreadyBookmarked = useMemo(() => {
    const list = fetchedPost?.savedIds || [];
    return list.includes(currentUser?.id);
  }, [fetchedPost?.savedIds, currentUser?.id]);

  const toggleBookmarkOnPost = useCallback(async () => {
    try {
      if (isAlreadyBookmarked) {
        await axios.delete("/api/bookmark", { data: { postId } });
      } else {
        await axios.post("/api/bookmark", { postId });
      }

      mutateFetchedPost();
      mutateFetchedPosts();
      mutateFetchedBookmarks();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }, [
    postId,
    isAlreadyBookmarked,
    mutateFetchedPost,
    mutateFetchedPosts,
    mutateFetchedBookmarks,
  ]);

  return {
    isAlreadyBookmarked,
    toggleBookmarkOnPost,
  };
};

export default useAddBookmark;
