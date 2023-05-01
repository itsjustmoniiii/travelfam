import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useTrendingUsers from "./useTrendingUsers";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const {
    data: fetchedTrendingUsers = [],
    mutate: mutateFetchedTrendingUsers,
  } = useTrendingUsers();

  const isAlreadyFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollowUser = useCallback(async () => {
    try {
      if (isAlreadyFollowing) {
        await axios.delete("/api/follow", { data: { userId } });
      } else if (isAlreadyFollowing == false) {
        await axios.post("/api/follow", { userId });
      }

      mutateFetchedUser();
      mutateCurrentUser();
      mutateFetchedTrendingUsers();
      toast.success("Success");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }, [
    userId,
    isAlreadyFollowing,
    mutateCurrentUser,
    mutateFetchedUser,
    mutateFetchedTrendingUsers,
  ]);

  return {
    isAlreadyFollowing,
    toggleFollowUser,
  };
};

export default useFollow;
