import { create } from "zustand";

interface EditProfileModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditProfileModal = create<EditProfileModalStore>((set) => ({
  //isOpen false by default
  isOpen: false,
  //onOpen --> open it
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
