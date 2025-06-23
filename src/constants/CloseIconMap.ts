import CloseWhiteIcon from '@assets/icons/toast/close_white.svg?react'
import CloseBlackIcon from '@assets/icons/toast/close_black.svg?react'
import CloseBlueIcon from '@assets/icons/toast/close_blue.svg?react'
import CloseGreenIcon from '@assets/icons/toast/close_green.svg?react'
import CloseRedIcon from '@assets/icons/toast/close_red.svg?react'
import CloseYellowIcon from '@assets/icons/toast/close_yellow.svg?react'

import type { ToastType, ToastStyle } from './IconMap'
import type { SvgIconComponent } from '@customType/icon'

export const closeIconMap: Record<
  ToastType,
  Record<ToastStyle, SvgIconComponent>
> = {
  default: {
    style1: CloseWhiteIcon,
    style2: CloseBlackIcon,
    style3: CloseBlackIcon,
    style4: CloseBlackIcon,
    style5: CloseBlackIcon,
  },
  info: {
    style1: CloseBlueIcon,
    style2: CloseBlueIcon,
    style3: CloseBlueIcon,
    style4: CloseBlueIcon,
    style5: CloseWhiteIcon,
  },
  success: {
    style1: CloseGreenIcon,
    style2: CloseGreenIcon,
    style3: CloseGreenIcon,
    style4: CloseGreenIcon,
    style5: CloseWhiteIcon,
  },
  error: {
    style1: CloseRedIcon,
    style2: CloseRedIcon,
    style3: CloseRedIcon,
    style4: CloseRedIcon,
    style5: CloseWhiteIcon,
  },
  warning: {
    style1: CloseYellowIcon,
    style2: CloseYellowIcon,
    style3: CloseYellowIcon,
    style4: CloseYellowIcon,
    style5: CloseWhiteIcon,
  },
}
