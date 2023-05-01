import Layout from "@/components/layouts/Layout";
import PostFeed from "@/components/posts/PostFeed";
import BioUser from "@/components/users/BioUser";
import HeroUser from "@/components/users/HeroUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFollow from "@/hooks/useFollow";
import useUser from "@/hooks/useUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { userId } = router.query;
  const { isAlreadyFollowing } = useFollow(userId as string);

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (!fetchedUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (
    fetchedUser?.id == currentUser.id ||
    isAlreadyFollowing ||
    !fetchedUser?.isPrivate
  ) {
    return (
      <>
        <Layout>
          <Head>
            <title>{fetchedUser?.username}</title>
          </Head>
          <div className="mb-10">
            <HeroUser userId={userId as string} />
            <BioUser userId={userId as string} />
            {isLoading && (
              <div className="flex justify-center items-center h-screen">
                <ClipLoader color="lightblue" size={80} />
              </div>
            )}
            {!isLoading && <PostFeed userId={userId as string} />}
          </div>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout>
          <Head>
            <title>{fetchedUser?.username}</title>
          </Head>
          <div className="mb-10">
            <HeroUser userId={userId as string} />
            <BioUser userId={userId as string} />
            <div className="w-full flex p-5 bg-[#2c2c2cae] text-white rounded-lg">
              <p>
                This profile is private - to see the posts, you have to follow
                the user
              </p>
            </div>
          </div>
          {/* <PostFeed /> */}
        </Layout>
      </>
    );
  }
};

export default UserView;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
