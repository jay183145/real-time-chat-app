import { create } from "zustand"

export type AuthModalType = "register" | "login" | "forget" | "new-password" | null

type AuthModalStore = {
    type: AuthModalType
    modalStack: AuthModalType[]
    initAuthModal: (type: AuthModalType) => void
    openModal: (type: AuthModalType) => void
    closeModal: () => void
    closeAllModals: () => void
    backToPreviousModal: () => void
}

export const useAuthModalStore = create<AuthModalStore>((set, get) => ({
    type: null,
    modalStack: [],
    initAuthModal: (type: AuthModalType) => set({ type, modalStack: [] }),
    openModal: (type: AuthModalType) => set({ type, modalStack: [...get().modalStack, type] }),
    closeModal: () => set({ type: null, modalStack: get().modalStack.slice(0, -1) }),
    closeAllModals: () => set({ type: null, modalStack: [] }),
    backToPreviousModal: () =>
        set({ type: get().modalStack[get().modalStack.length - 2], modalStack: get().modalStack.slice(0, -1) }),
}))
