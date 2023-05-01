import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import CreatePostModal from "@/components/modals/CreatePostModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import EditPostModal from "@/components/modals/EditPostModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
