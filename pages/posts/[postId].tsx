import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CommentFeed from "@/components/comment/CommentFeed";
import Layout from "@/components/layouts/Layout";
import Post from "@/components/posts/Post";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { postId } = router.query;
  const [writeComment, setWriteComment] = useState("");
  const { data: fetchedPost, mutate: mutatePost } = usePost(postId as string);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/comments?postId=${postId}`, {
        writeComment,
      });
      setWriteComment("");
      toast.success("Successfully commented");
      mutatePost();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  }, [writeComment, mutatePost, postId]);

  if (isLoading || !fetchedPost) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="lightblue" size={80} />
        </div>
      </>
    );
  }

  return (
    <>
      <>
        <Layout>
          <Head>
            <title>{fetchedPost?.username}</title>
          </Head>
          <Post data={fetchedPost} />
          <div className="flex flex-col w-full bg-neutral-900 p-5 border-t-2 border-b-2 border-neutral-500">
            <div className="flex gap-3">
              <div className="w-fit">
                <Avatar userId={currentUser?.id} />
              </div>
              <div className="w-full">
                <textarea
                  placeholder="Enter text..."
                  value={writeComment}
                  disabled={isLoading}
                  onChange={(e) => setWriteComment(e.target.value)}
                  className="p-2 rounded h-20 w-full bg-neutral-700 text-white"
                />
              </div>
            </div>
            <div className=" flex justify-end mt-2">
              <Button label="Send" onClick={onSubmit} />
            </div>
          </div>
          <CommentFeed comments={fetchedPost?.comments} />
          {/* <PostFeed /> */}
        </Layout>
      </>
    </>
  );
};

export default PostView;
