import type { ComponentType, SVGProps } from 'react'

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type IconProps = {
  icon: SvgIconComponent
  size?: number
  color?: string
  className?: string
  iconClassName?: string
}
