import Layout from "@/components/layouts/Layout";
import Post from "@/components/posts/Post";
import PostFeed from "@/components/posts/PostFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Layout>
        <PostFeed />
      </Layout>
    </>
  );
}

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
