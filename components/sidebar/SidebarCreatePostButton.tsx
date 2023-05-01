import useCreatePostModal from "@/hooks/useCreatePostModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import Button from "../Button";

const SidebarCreatePostButton = () => {
  const createPostModal = useCreatePostModal();
  const router = useRouter();
  const onClick = useCallback(() => {
    createPostModal.onOpen();
  }, [createPostModal]);

  return (
    <>
      <Button
        onClick={onClick}
        label="Publish"
        icon={FaFeather}
        fullWidth
        large
      />
    </>
  );
};

export default SidebarCreatePostButton;
