import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";
import styles from "../../styles/User.module.css";

interface HeroUserProps {
  userId: string;
}

const HeroUser: React.FC<HeroUserProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <>
      <div>
        <div className={styles.backgroundImg}>
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </>
  );
};

export default HeroUser;
