import DefaultStyle1Icon from '@assets/icons/toast/defaultStyle1.svg?react'
import InfoStyle1Icon from '@assets/icons/toast/infoStyle1.svg?react'
import SuccessStyle1Icon from '@assets/icons/toast/successStyle1.svg?react'
import ErrorStyle1Icon from '@assets/icons/toast/errorStyle1.svg?react'
import WarningStyle1Icon from '@assets/icons/toast/warningStyle1.svg?react'

import DefaultStyle2Icon from '@assets/icons/toast/defaultStyle2.svg?react'
import InfoStyle2Icon from '@assets/icons/toast/infoStyle2.svg?react'
import SuccessStyle2Icon from '@assets/icons/toast/successStyle2.svg?react'
import ErrorStyle2Icon from '@assets/icons/toast/errorStyle2.svg?react'
import WarningStyle2Icon from '@assets/icons/toast/warningStyle2.svg?react'

import DefaultStyle3Icon from '@assets/icons/toast/defaultStyle3.svg?react'
import InfoStyle3Icon from '@assets/icons/toast/infoStyle3.svg?react'
import SuccessStyle3Icon from '@assets/icons/toast/successStyle3.svg?react'
import ErrorStyle3Icon from '@assets/icons/toast/errorStyle3.svg?react'
import WarningStyle3Icon from '@assets/icons/toast/warningStyle3.svg?react'

import DefaultStyle4Icon from '@assets/icons/toast/defaultStyle4.svg?react'
import InfoStyle4Icon from '@assets/icons/toast/infoStyle4.svg?react'
import SuccessStyle4Icon from '@assets/icons/toast/successStyle4.svg?react'
import ErrorStyle4Icon from '@assets/icons/toast/errorStyle4.svg?react'
import WarningStyle4Icon from '@assets/icons/toast/warningStyle4.svg?react'

import DefaultStyle5Icon from '@assets/icons/toast/defaultStyle5.svg?react'
import InfoStyle5Icon from '@assets/icons/toast/infoStyle5.svg?react'
import SuccessStyle5Icon from '@assets/icons/toast/successStyle5.svg?react'
import ErrorStyle5Icon from '@assets/icons/toast/errorStyle5.svg?react'
import WarningStyle5Icon from '@assets/icons/toast/warningStyle5.svg?react'

export const iconMap = {
  default: {
    style1: DefaultStyle1Icon,
    style2: DefaultStyle2Icon,
    style3: DefaultStyle3Icon,
    style4: DefaultStyle4Icon,
    style5: DefaultStyle5Icon,
  },
  info: {
    style1: InfoStyle1Icon,
    style2: InfoStyle2Icon,
    style3: InfoStyle3Icon,
    style4: InfoStyle4Icon,
    style5: InfoStyle5Icon,
  },
  success: {
    style1: SuccessStyle1Icon,
    style2: SuccessStyle2Icon,
    style3: SuccessStyle3Icon,
    style4: SuccessStyle4Icon,
    style5: SuccessStyle5Icon,
  },
  error: {
    style1: ErrorStyle1Icon,
    style2: ErrorStyle2Icon,
    style3: ErrorStyle3Icon,
    style4: ErrorStyle4Icon,
    style5: ErrorStyle5Icon,
  },
  warning: {
    style1: WarningStyle1Icon,
    style2: WarningStyle2Icon,
    style3: WarningStyle3Icon,
    style4: WarningStyle4Icon,
    style5: WarningStyle5Icon,
  },
} as const

export type ToastType = keyof typeof iconMap
export type ToastStyle = keyof (typeof iconMap)[ToastType]
