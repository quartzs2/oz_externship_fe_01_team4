import { cn } from '@utils/cn'
// 수정 뭐했는지 체크
type LabelProps = {
  htmlFor: string
  labelText: string
  className?: string
}

const Label = ({ htmlFor, labelText, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'flex h-full w-[200px] items-center bg-[#F7F7F7] px-[22px] text-[14px] text-[#222]',
        className
      )}
    >
      {labelText}
    </label>
  )
}

export default Label
