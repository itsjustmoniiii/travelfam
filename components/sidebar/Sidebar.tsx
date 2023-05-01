import useCurrentUser from "@/hooks/useCurrentUser";
import {
  BsHouseFill,
  BsBellFill,
  BsSearch,
  BsFillBookmarkHeartFill,
} from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import SidebarCreatePostButton from "../sidebar/SidebarCreatePostButton";
import SidebarItem from "../sidebar/SidebarItem";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Profile",
      href: currentUser ? `/users/${currentUser.id}` : "/",
      icon: FaUser,
    },

    {
      label: "Trending",
      href: "/trending",
      icon: HiTrendingUp,
    },
    {
      label: "Search",
      href: "/search",
      icon: BsSearch,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: BsFillBookmarkHeartFill,
    },
  ];

  const router = useRouter();

  const isMenuActive = (item: any) => {
    return router.asPath === item.href;
  };

  return (
    <>
      <div className="lg:col-span-1 col-span-4 mb-4 lg:mb-0">
        <div className="flex lg:flex-col lg:items-center justify-between items-start">
          <div className="lg:space-y-5 lg:px-5 py-2 lg:py-5 px-2 rounded-lg w-full flex lg:block items-center justify-between bg-[#232323ae] lg:w-fit">
            {items.map((item) => (
              <Link key={item.label} href={item.href}>
                <SidebarItem
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  alert={item.alert}
                  styleTextActive={
                    isMenuActive(item)
                      ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "text-white font-semibold"
                  }
                  styleIconActive={
                    isMenuActive(item)
                      ? "text-blue-500"
                      : "text-white font-semibold"
                  }
                />
              </Link>
            ))}
            <SidebarCreatePostButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
