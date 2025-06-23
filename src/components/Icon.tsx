import { type IconProps } from '@customType/icon'
import { cn } from '@utils/cn'

export default function Icon({
  icon: ImgIcon,
  width = 18,
  height = 18,
  color = 'text-primary-600',
  className,
  IconClassName,
}: IconProps) {
  const formatSizeValue = (value: number | string) =>
    typeof value === 'number' ? `${value}px` : value

  return (
    <div className={cn(`flex items-center justify-center`, className)}>
      <ImgIcon
        className={cn(color, IconClassName)}
        style={{
          width: formatSizeValue(width),
          height: formatSizeValue(height),
        }}
      />
    </div>
  )
}
