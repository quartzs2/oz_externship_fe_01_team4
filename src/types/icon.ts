import type { ComponentType, SVGProps } from 'react'

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>

export type IconProps = {
  icon: SvgIconComponent
  width?: number | string
  height?: number | string
  color?: string
  className?: string
  IconClassName?: string
}
