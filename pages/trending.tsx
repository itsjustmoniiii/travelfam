import BookmarksFeed from "@/components/bookmarks/BookmarksFeed";
import Layout from "@/components/layouts/Layout";
import TrendingFeed from "@/components/trending/TrendingFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";

const Trending = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Layout>
        <Head>
          <title>Trending</title>
        </Head>
        <div className="mb-10">
          <TrendingFeed />
        </div>
      </Layout>
    </>
  );
};

export default Trending;

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
