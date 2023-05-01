import { create } from "zustand";

interface CreatePostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreatePostModal = create<CreatePostModalStore>((set) => ({
  //isOpen false by default
  isOpen: false,
  //onOpen --> open it
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreatePostModal;
