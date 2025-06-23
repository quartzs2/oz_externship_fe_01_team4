import { type ToastType } from '@constants/IconMap'

export const TOAST_CONSTANTS = {
  DEFAULT_TYPE: 'default',
  DEFAULT_STYLE: 'style1',
  DEFAULT_ACTION_LABEL: 'BUTTON',

  STYLE: {
    SOLID_BLACK: 'style1',
    WHITE_CLEAN: 'style2',
    WHITE_BORDER: 'style3',
    WHITE_LEFT_BORDER: 'style4',
    SOLID_COLORED: 'style5',
  } as const,

  TYPE: {
    DEFAULT: 'default',
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
  },

  BASE_CLASSES:
    'w-[350px] px-4 py-3 text-sm flex items-center justify-between gap-3 shadow-md rounded-2xl flex-shrink-0',
  ACTION_BUTTON_BASE_CLASSES:
    'rounded border-none bg-transparent px-2 py-1 text-xs font-bold',
  CLOSE_BUTTON_BASE_CLASSES: 'rounded-full p-1',
  CLOSE_BUTTON_HOVER_CLASSES: 'hover:bg-gray-200',

  COLOR_WHITE: 'white',

  MAIN_ICON_SIZE: 24,
  CLOSE_ICON_SIZE: 16,

  CLOSE_BUTTON_ARIA_LABEL: 'Close',
} as const

export const WHITE_BG_STYLES = [
  TOAST_CONSTANTS.STYLE.WHITE_CLEAN,
  TOAST_CONSTANTS.STYLE.WHITE_BORDER,
  TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER,
]

export const translucentBgMap: Record<ToastType, string> = {
  [TOAST_CONSTANTS.TYPE.DEFAULT]: '',
  [TOAST_CONSTANTS.TYPE.INFO]: 'bg-[rgba(0,123,255,0.15)]',
  [TOAST_CONSTANTS.TYPE.SUCCESS]: 'bg-[rgba(40,167,69,0.15)]',
  [TOAST_CONSTANTS.TYPE.ERROR]: 'bg-[rgba(220,53,69,0.15)]',
  [TOAST_CONSTANTS.TYPE.WARNING]: 'bg-[rgba(255,193,7,0.15)]',
}
