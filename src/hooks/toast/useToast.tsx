import { toast } from 'react-hot-toast'
import { CustomToast } from '@components/common/Toast'
import type { ToastStyle, ToastType } from '@constants/toast/toastIconMap'

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
  // showToast 함수는 내부적으로만 사용됩니다.
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
