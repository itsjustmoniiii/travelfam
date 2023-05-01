import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

interface NotificationProps {
  data: Record<string, any>;
}

const Notification: React.FC<NotificationProps> = ({ data }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const goToPost = useCallback(
    (event: any) => {
      router.push(`/posts/${data.post?.id}`);
    },
    [router, data.post?.id]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  let category;
  if (data.category?.name === "like") {
    category = "liked your";
  } else if (data.category?.name === "follow") {
    category = "followed you";
  } else if (data.category?.name === "comment") {
    category = "commented on your";
  }
  {
    data.category?.name === "follow" && <p className="">followed you</p>;
  }
  {
    data.category?.name === "comment" && ` commented on your post`;
  }

  let username =
    data.actor.username == currentUser.username ? "You" : data.actor.username;

  const string = username + " " + category + " " + createdAt + " ago";
  const stringHalf1 = username + " " + category;
  const stringHalf2 = " " + createdAt + " ago";

  return (
    <>
      <div className="bg-neutral-900 text-white font-normal rounded-lg  p-5 flex items-center">
        {data.category?.name == "follow" && (
          <>
            <Avatar userId={data.actor.id} />
            <p className="ml-2">{string}</p>
          </>
        )}
        {(data.category?.name == "like" ||
          data.category?.name == "comment") && (
          <>
            <Avatar userId={data.actor.id} />
            <p className="ml-2">{stringHalf1}</p>
            <p
              onClick={goToPost}
              className="font-bold px-1 cursor-pointer hover:text-blue-600"
            >
              post
            </p>
            <p>{stringHalf2}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Notification;
