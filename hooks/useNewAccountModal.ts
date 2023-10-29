import { create } from "zustand";

interface NewAccountModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useNewAccountModal = create<NewAccountModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useNewAccountModal;