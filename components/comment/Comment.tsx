import Avatar from "../Avatar";
import usePost from "@/hooks/usePost";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentProps {
  data: Record<string, any>;
}

const Comment: React.FC<CommentProps> = ({ data }) => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedPost } = usePost(postId as string);
  const [isLoading, setIsLoading] = useState(false);
  const commentId = data.id;

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/comments", { data: { commentId } });
      toast.success("Successfully deleted");
      mutateFetchedPost();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  }, [commentId, mutateFetchedPost]);

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <>
      <div className="bg-neutral-700 rounded-lg  p-2 flex flex-col">
        <div className="w-full flex items-center py-2 justify-between">
          <div className="flex items-center">
            <Avatar userId={data.user.id} />
            <div className="flex flex-col pl-2">
              <p className="text-white font-semibold text-base">
                {data.user.username}
              </p>
              <p className="text-white text-xs font-light">{createdAt} ago</p>
              <p className="text-white font-normal mt-1">{data.text}</p>
            </div>
          </div>
          {data.user.id == currentUser.id && (
            <div>
              <Button label="Delete" secondary onClick={onClick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
