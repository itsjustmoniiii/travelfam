import { useRouter } from "next/router";

const HeaderLogo = () => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/")}
        className="
        flex
        items-center
        cursor-pointer
        transition"
      >
        <span className="font-extrabold text-transparent  text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
          TRAVELFAM
        </span>
      </div>
    </>
  );
};

export default HeaderLogo;
