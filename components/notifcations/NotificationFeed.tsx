import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import Notification from "./Notification";
import { ClipLoader } from "react-spinners";

interface NotifactionsFeedProps {
  userId: string;
}

const NotifactionsFeed: React.FC<NotifactionsFeedProps> = ({ userId }) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const {
    data: fetchedNotifications = [],
    mutate: mutateFetchedNotifications,
    isLoading,
  } = useNotifications(userId);

  useEffect(() => {
    mutateCurrentUser();
    mutateFetchedNotifications();
  }, [mutateCurrentUser, mutateFetchedNotifications]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (fetchedNotifications?.length === 0) {
    return (
      <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
        <p>You currently have no notifications</p>
      </div>
    );
  }

  return (
    <div>
      {fetchedNotifications?.map((notification: Record<string, any>) => (
        <div key={notification.id} className="mb-4">
          <Notification data={notification} />
        </div>
      ))}
    </div>
  );
};

export default NotifactionsFeed;
