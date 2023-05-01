import useCreatePostModal from "@/hooks/useCreatePostModal";
import { useCallback, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import useTrendingPosts from "@/hooks/useTrendingPosts";
import ImageUpload from "../ImageUpload";
import { toast } from "react-hot-toast";

const CreatePostModal = () => {
  const { mutate: mutatePosts = [] } = usePosts();
  const createPostModal = useCreatePostModal();
  const [file, setFile] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: fetchedTrendingPosts = [],
    mutate: mutateFetchedTrendingPosts,
  } = useTrendingPosts();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", {
        text,
        file,
      });

      toast.success("Successfully created");
      setText("");
      setFile("");
      mutatePosts();

      mutateFetchedTrendingPosts();

      createPostModal.onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setText("");
      setFile("");
    }
    setIsLoading(false);
  }, [text, file, mutatePosts, createPostModal, mutateFetchedTrendingPosts]);

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
          label="Upload a picture"
        />
      </div>
    </div>
  );

  return (
    <>
      <Modal
        body={bodyOfModal}
        disabled={isLoading}
        isOpen={createPostModal.isOpen}
        title="Create a post"
        submitBtnLabel="Publish"
        onClose={createPostModal.onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CreatePostModal;
