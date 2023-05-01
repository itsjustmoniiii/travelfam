import Layout from "@/components/layouts/Layout";
import NotifactionsFeed from "@/components/notifcations/NotificationFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const Notifications = () => {
  const { data: currentUser } = useCurrentUser();
  return (
    <>
      <Layout>
        <Head>
          <title>Notifications</title>
        </Head>
        <div className="mb-10">
          <NotifactionsFeed userId={currentUser?.id} />
        </div>
      </Layout>
    </>
  );
};

export default Notifications;

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
