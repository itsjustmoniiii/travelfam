import BookmarksFeed from "@/components/bookmarks/BookmarksFeed";
import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/search/SearchBar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";

const Search = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Layout>
        <Head>
          <title>Search</title>
        </Head>
        <div className="mb-10">
          <SearchBar />
        </div>
      </Layout>
    </>
  );
};

export default Search;

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
