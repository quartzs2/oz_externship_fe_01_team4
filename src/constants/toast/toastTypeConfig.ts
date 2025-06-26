export const typeConfig = {
  default: {
    actionButtonTextColor: 'text-black',
    toastBorderColor: 'border-border-light-gray',
    leftBorderColor: 'border-l-black',
    bgColor: 'bg-toast-default-white',
  },
  info: {
    actionButtonTextColor: 'text-[#4B85F5]',
    toastBorderColor: 'border-[#4B85F5]',
    leftBorderColor: 'border-l-[#4B85F5]',
    bgColor: 'bg-[#4B85F5]',
  },
  success: {
    actionButtonTextColor: 'text-[#01E17B]',
    toastBorderColor: 'border-[#01E17B]',
    leftBorderColor: 'border-l-[#01E17B]',
    bgColor: 'bg-[#01E17B]',
  },
  error: {
    actionButtonTextColor: 'text-[#F04349]',
    toastBorderColor: 'border-[#F04349]',
    leftBorderColor: 'border-l-[#F04349]',
    bgColor: 'bg-[#F04349]',
  },
  warning: {
    actionButtonTextColor: 'text-[#FDCD0F]',
    toastBorderColor: 'border-[#FDCD0F]',
    leftBorderColor: 'border-l-[#FDCD0F]',
    bgColor: 'bg-[#FDCD0F]',
  },
} as const

export type TypeConfigKey = keyof typeof typeConfig
export type TypeConfigValue = (typeof typeConfig)[TypeConfigKey]
