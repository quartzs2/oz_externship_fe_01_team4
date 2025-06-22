import { create } from 'zustand'

export type ModalId = string

type ModalState = {
  openModals: ModalId[]
  openModal: (modalId: ModalId) => void
  closeModal: (modalId: ModalId) => void
  closeAllModals: () => void
  getTopModal: () => ModalId | undefined
}

const handleBodyScroll = () => {
  const openModalCount = useModalStore.getState().openModals.length
  if (openModalCount > 0) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'visible'
  }
}

export const useModalStore = create<ModalState>((set, get) => ({
  openModals: [],
  openModal: (modalId) => {
    set((state) => {
      if (state.openModals.includes(modalId)) {
        return state
      }
      return { openModals: [...state.openModals, modalId] }
    })
    handleBodyScroll()
  },
  closeModal: (modalId) => {
    set((state) => ({
      openModals: state.openModals.filter((id) => id !== modalId),
    }))
    setTimeout(handleBodyScroll, 0)
  },
  closeAllModals: () => {
    set({ openModals: [] })
    setTimeout(handleBodyScroll, 0)
  },
  getTopModal: () => {
    const { openModals } = get()
    return openModals.length > 0 ? openModals[openModals.length - 1] : undefined
  },
}))
