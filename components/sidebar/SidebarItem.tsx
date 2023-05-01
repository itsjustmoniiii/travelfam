import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
  alert?: boolean;
  styleTextActive?: string;
  styleIconActive?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
  onClick,
  alert,
  styleTextActive,
  styleIconActive,
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick;
    }
    if (href) {
      router.push(href);
    }
  }, [href, router, onClick]);

  return (
    <>
      <div onClick={onClick} className="flex flex-row items-center">
        <div
          className={`
       
        relative
        rounded-xl
        md:gap-4 gap-2
        flex
        w-full
        items-center
        justify-center lg:justify-start
        p-3
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
      `}
        >
          <Icon size={25} className={styleIconActive} />
          <p className={`hidden lg:block  ${styleTextActive} text-xl`}>
            {label}
          </p>
          {alert ? (
            <BsDot className="text-sky-500 absolute -top-4 left-0" size={60} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SidebarItem;
