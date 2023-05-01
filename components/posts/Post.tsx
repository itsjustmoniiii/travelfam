import Image from "next/image";
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  BsHeart,
  BsHeartFill,
  BsFillChatLeftDotsFill,
  BsFillBookmarkHeartFill,
  BsBookmarkHeart,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import useLike from "@/hooks/useLike";
import useAddBookmark from "@/hooks/useAddBookmark";
import Button from "../Button";
import useEditPostModal from "@/hooks/useEditPostModal";
import useTrendingPosts from "@/hooks/useTrendingPosts";

interface PostProps {
  userId?: string;
  data: Record<string, any>;
}

const Post: React.FC<PostProps> = ({ userId, data = {} }) => {
  const router = useRouter();
  const { isAlreadyLiked, toggleLikeOnPost } = useLike({
    postId: data.id,
    userId: userId,
  });
  const {
    data: fetchedTrendingPosts = [],
    mutate: mutateFetchedTrendingPosts,
  } = useTrendingPosts();
  const { isAlreadyBookmarked, toggleBookmarkOnPost } = useAddBookmark({
    postId: data.id,
  });
  const editPostModal = useEditPostModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    editPostModal.onOpen();
  }, [editPostModal]);

  const goToPost = useCallback(
    (event: any) => {
      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      toggleLikeOnPost();

      mutateFetchedTrendingPosts();
    },
    [toggleLikeOnPost, mutateFetchedTrendingPosts]
  );

  const onBookmark = useCallback(
    (event: any) => {
      event.stopPropagation();
      toggleBookmarkOnPost();
    },
    [toggleBookmarkOnPost]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <>
      <div
        className="bg-neutral-900 rounded-lg  p-5 flex flex-col"
        onClick={goToPost}
      >
        <div className="w-full flex items-start py-2 justify-between">
          <div className="flex">
            <Avatar userId={data.user.id} />
            <div className="flex flex-col pl-2">
              <p className="text-white text-lg font-semibold">
                {data.user.username}
              </p>
              <p className="text-white text-sm font-light">{createdAt} ago</p>
            </div>
          </div>

          {data.user.id == currentUser?.id && (
            <div>
              <Button label="Edit" secondary onClick={onClick} />
            </div>
          )}
        </div>
        <div className="w-full my-5">
          <p className="text-white font-normal">{data.text}</p>
          {data.image !== "" && (
            <div className="w-full bg-neutral-950 p-4 flex items-center justify-center rounded-lg  mt-2">
              <Image src={data.image} alt="post-img" width={300} height={300} />
            </div>
          )}
        </div>
        <div className="w-full grid grid-cols-3 bg-neutral-900 p-2 rounded-md">
          <div className="flex items-center justify-center gap-2 px-2 text-neutral-300 cursor-pointer transition hover:text-red-500">
            {isAlreadyLiked ? (
              <BsHeartFill size={22} color="#ba0022" onClick={onLike} />
            ) : (
              <BsHeart size={22} onClick={onLike} />
            )}

            <p className="font-medium">{data.likedIds.length || 0}</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-2 text-neutral-300 cursor-pointer transition hover:text-blue-500">
            <BsFillChatLeftDotsFill size={22} onClick={goToPost} />
            <p className="font-medium">{data.comments?.length || 0}</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-2 text-neutral-300 cursor-pointer transition hover:text-blue-500">
            {isAlreadyBookmarked ? (
              <BsFillBookmarkHeartFill
                size={22}
                color="blue"
                onClick={onBookmark}
              />
            ) : (
              <BsBookmarkHeart size={22} onClick={onBookmark} />
            )}

            <p className="font-medium">{data.savedIds?.length || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
