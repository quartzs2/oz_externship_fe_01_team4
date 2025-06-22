import Icon from '@components/Icon'
import Portal from '@components/Portal'
import { PORTAL_TARGET_ID } from '@constants/portalTargetId'
import { Z_INDEX_DEFINE } from '@constants/zIndexDefine'
import { useModalStore } from '@store/modalStore'
import { cn } from '@utils/cn'
import { useEffect, type ReactNode } from 'react'
import CloseIcon from '@assets/icons/modal/close.svg?react'

type ModalProps = {
  modalId: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  hasCloseButton?: boolean
  isBackgroundDimmed?: boolean
}

const Modal = ({
  modalId,
  isOpen,
  onClose,
  children,
  className,
  hasCloseButton = true,
  isBackgroundDimmed = true,
}: ModalProps) => {
  const { openModal, closeModal, openModals, getTopModal } = useModalStore()

  useEffect(() => {
    if (isOpen) {
      openModal(modalId)
    } else {
      closeModal(modalId)
    }

    return () => {
      closeModal(modalId)
    }
  }, [isOpen, modalId, openModal, closeModal])

  if (!openModals.includes(modalId)) {
    return null
  }

  const topModalId = getTopModal()
  const isTopModal = topModalId === modalId
  const currentZIndex = Z_INDEX_DEFINE.MODAL + openModals.indexOf(modalId) * 10

  return (
    <Portal targetId={PORTAL_TARGET_ID.MODAL}>
      <div
        className={cn(
          'fixed inset-0',
          'h-screen w-screen',
          'flex items-center justify-center',
          { 'bg-black/20': isBackgroundDimmed }
        )}
        style={{
          zIndex: currentZIndex,
        }}
        onClick={() => {
          if (isTopModal) {
            onClose()
            closeModal(modalId)
          }
        }}
      >
        <div
          className={cn('relative rounded-[6px] bg-white p-5', className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {hasCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-2.5 right-2.5 p-1 text-gray-500 hover:text-gray-700"
            >
              <Icon icon={CloseIcon} size={24} />
            </button>
          )}
        </div>
      </div>
    </Portal>
  )
}
export default Modal
