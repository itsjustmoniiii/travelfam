import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { format } from "date-fns";
import { useMemo, useCallback } from "react";
import { BsFillCalendar2Fill } from "react-icons/bs";
import Button from "../Button";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import useFollow from "@/hooks/useFollow";

interface BioUserProps {
  userId: string;
}

const BioUser: React.FC<BioUserProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  const { data: currentUser } = useCurrentUser();
  const { isAlreadyFollowing, toggleFollowUser } = useFollow(userId);
  const editProfileModal = useEditProfileModal();
  const onClick = useCallback(() => {
    editProfileModal.onOpen();
  }, [editProfileModal]);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <>
      <div className="bg-neutral-900 border-neutral-800 p-4 mb-4">
        <div className="flex justify-end">
          {currentUser?.id === userId ? (
            <Button secondary label="Edit" onClick={onClick} />
          ) : (
            <Button
              secondary={!isAlreadyFollowing}
              outline={isAlreadyFollowing}
              label={isAlreadyFollowing ? "Unfollow" : "Follow"}
              onClick={toggleFollowUser}
            />
          )}
        </div>
        <div className="mt-4 px-4">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.username}
          </p>
        </div>

        <div className="flex flex-col mt-4 px-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BsFillCalendar2Fill size={24} />
            <p>Joined in {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-3 gap-6 px-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white pr-1">
              {fetchedUser?.followingIds?.length}
            </p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white pr-1">
              {fetchedUser?.followersCount || 0}
            </p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioUser;
