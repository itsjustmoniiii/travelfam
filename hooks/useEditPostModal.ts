import { create } from "zustand";

interface EditPostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditPostModal = create<EditPostModalStore>((set) => ({
  //isOpen false by default
  isOpen: false,
  //onOpen --> open it
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditPostModal;
