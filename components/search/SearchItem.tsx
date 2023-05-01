import Avatar from "../Avatar";
import Button from "../Button";
import useFollow from "@/hooks/useFollow";

interface SearchItemProps {
  data: Record<string, any>;
}

const SearchItem: React.FC<SearchItemProps> = ({ data = {} }) => {
  const { isAlreadyFollowing, toggleFollowUser } = useFollow(data.id);

  return (
    <>
      <div className="flex mb-3 justify-between text-white items-center p-2 bg-[#2c2c2cae] rounded-lg">
        <div className="flex items-center gap-2">
          <Avatar userId={data.id} />
          <p>{data.username}</p>
        </div>
        <Button
          onClick={toggleFollowUser}
          secondary={!isAlreadyFollowing}
          outline={isAlreadyFollowing}
          label={isAlreadyFollowing ? "Unfollow" : "Follow"}
        />
      </div>
    </>
  );
};

export default SearchItem;
