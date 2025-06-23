import { toast } from 'react-hot-toast'
import { CustomToast } from '@components/Toast'
import type { ToastStyle, ToastType } from '@constants/IconMap'

type ShowToastOptions = {
  message: string
  type?: ToastType
  style?: ToastStyle
  hasActionButton?: boolean
  actionLabel?: string
  onActionClick?: () => void
  hasCloseButton?: boolean
  hasIcon?: boolean
  duration?: number
}

export const useCustomToast = () => {
  const showToast = ({
    message,
    type = 'default',
    style = 'style1',
    hasActionButton = true,
    actionLabel = 'BUTTON',
    onActionClick,
    hasCloseButton = true,
    hasIcon = true,
    duration = 4000,
  }: ShowToastOptions) => {
    const toastId = toast.custom(
      (t) => (
        <CustomToast
          id={t.id}
          message={message}
          type={type}
          style={style}
          hasActionButton={hasActionButton}
          actionLabel={actionLabel}
          onActionClick={onActionClick}
          hasCloseButton={hasCloseButton}
          hasIcon={hasIcon}
        />
      ),
      { duration }
    )

    return toastId
  }

  return {
    show: showToast,
    success: (message: string, options: Partial<ShowToastOptions> = {}) =>
      showToast({ message, type: 'success', ...options }),
    error: (message: string, options: Partial<ShowToastOptions> = {}) =>
      showToast({ message, type: 'error', ...options }),
    info: (message: string, options: Partial<ShowToastOptions> = {}) =>
      showToast({ message, type: 'info', ...options }),
    warning: (message: string, options: Partial<ShowToastOptions> = {}) =>
      showToast({ message, type: 'warning', ...options }),
    default: (message: string, options: Partial<ShowToastOptions> = {}) =>
      showToast({ message, type: 'default', ...options }),
  }
}
