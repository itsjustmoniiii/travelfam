import useEditPostModal from "@/hooks/useEditPostModal";
import { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTrendingPosts from "@/hooks/useTrendingPosts";
import ImageUpload from "../ImageUpload";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";

const EditPostModal = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { postId } = router.query;
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const editPostModal = useEditPostModal();
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: fetchedTrendingPosts = [],
    mutate: mutateFetchedTrendingPosts,
  } = useTrendingPosts();

  useEffect(() => {
    setFile(fetchedPost?.image);
    setText(fetchedPost?.text);
  }, [fetchedPost]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/posts/${postId}`, {
        text,
        file,
      });

      toast.success("Successfully updated");
      mutatePosts();
      mutateFetchedPost();
      editPostModal.onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  }, [text, file, postId, mutatePosts, editPostModal, mutateFetchedPost]);

  const deletePost = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/posts/${postId}`);

      toast.success("Successfully deleted");
      router.push(`/`);
      mutatePosts();
      mutateFetchedPost();

      mutateFetchedTrendingPosts();

      editPostModal.onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  }, [
    postId,
    router,
    mutatePosts,
    editPostModal,
    mutateFetchedPost,
    mutateFetchedTrendingPosts,
  ]);

  const bodyOfModal = (
    <div className="flex flex-col gap-4">
      <textarea
        placeholder="Enter text..."
        value={text}
        disabled={isLoading}
        onChange={(e) => setText(e.target.value)}
        className="p-2 rounded h-20"
      />
      <div>
        <ImageUpload
          value={file}
          disabled={isLoading}
          onChange={(image) => setFile(image)}
          label="Edit picture"
        />
      </div>
      <div
        onClick={deletePost}
        className="flex items-center gap-1 text-red-600 cursor-pointer hover:underline"
      >
        <BsTrash color="red" />
        <p>Delete Post</p>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        body={bodyOfModal}
        disabled={isLoading}
        isOpen={editPostModal.isOpen}
        title="Edit post"
        submitBtnLabel="Edit"
        onClose={editPostModal.onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditPostModal;
