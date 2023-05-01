import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  href?: Url;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  href,
  onClick,
  large,
  disabled,
  outline,
  icon: Icon,
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick;
    }
    if (href) {
      router.push(href);
    }
  }, [router, onClick, href]);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-xl
          font-semibold
          hover:opacity-80
          transition
      
          
          ${fullWidth ? "w-full" : "w-fit"}
          ${
            secondary
              ? "bg-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }
          ${secondary ? "text-black" : "text-white"}
          ${large ? "text-xl" : "text-md"}
          ${large ? "px-5" : "lg:px-3 px-2"}
          ${large ? "py-3" : "lg:py-2 py-1"}
          ${outline ? "bg-transparent" : ""}
          ${outline ? "border-white" : ""}
          ${outline ? "text-white" : ""}
        `}
    >
      <div className="flex items-center justify-center gap-3">
        {Icon && (
          <>
            <Icon size={24} />
            <p className="hidden lg:inline-flex">{label}</p>
          </>
        )}
        {!Icon && label && (
          <p className="inline-flex lg:text-[16px] text-[15px]">{label}</p>
        )}
      </div>
    </button>
  );
};

export default Button;
