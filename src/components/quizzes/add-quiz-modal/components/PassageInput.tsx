import { cn } from '@utils/cn'
import { useFormContext } from 'react-hook-form'

type PassageInputProps = {
  className?: string
}

const PassageInput = ({ className }: PassageInputProps) => {
  const { register } = useFormContext()

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">지문 등록</div>
      <textarea
        placeholder="지문을 입력해주세요"
        className="h-[70px] resize-none rounded-[3px] border border-[#DDDDDD] p-[12px] text-[14px] text-[#666666] outline-none"
        {...register('passage', { required: true })}
      />
    </div>
  )
}
export default PassageInput
