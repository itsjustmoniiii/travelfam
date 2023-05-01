import BookmarksFeed from "@/components/bookmarks/BookmarksFeed";
import Layout from "@/components/layouts/Layout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";

const Bookmarks = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Layout>
        <Head>
          <title>Bookmarks</title>
        </Head>
        <div className="mb-10">
          <BookmarksFeed userId={currentUser?.id} />
        </div>
      </Layout>
    </>
  );
};

export default Bookmarks;

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
