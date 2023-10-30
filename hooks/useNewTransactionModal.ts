import { create } from "zustand";

interface NewTransactionModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useNewTransactionModal = create<NewTransactionModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useNewTransactionModal;
