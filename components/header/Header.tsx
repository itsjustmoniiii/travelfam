import Button from "../Button";
import HeaderLogo from "./HeaderLogo";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-between py-10">
        <HeaderLogo />
        <Button
          label="Log Out"
          onClick={() => signOut()}
          large
          icon={BiLogOut}
        />
      </div>
    </>
  );
};

export default Header;
