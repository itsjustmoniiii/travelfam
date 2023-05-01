import { useEffect } from "react";
import useTrendingUsers from "@/hooks/useTrendingUsers";
import Avatar from "../Avatar";
import { ClipLoader } from "react-spinners";

const TrendingUsers = () => {
  const { data: fetchedTrendingUsers = [], isLoading } = useTrendingUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (fetchedTrendingUsers?.length === 0) {
    return (
      <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
        <p>There are currently no trending users</p>
      </div>
    );
  }

  return (
    <div>
      {fetchedTrendingUsers?.map((user: Record<string, any>) => (
        <div
          key={user.id}
          className="mb-3 text-white flex gap-3 items-center p-3 bg-[#2c2c2cae] rounded-lg"
        >
          <Avatar userId={user.id} />
          <div>
            <p>{user.username}</p>
            <p>{user.countFollowers} Followers</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingUsers;
