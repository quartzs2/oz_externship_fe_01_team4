import { cn } from '@utils/cn'
import { useFormContext } from 'react-hook-form'

type AnswerInputProps = {
  className?: string
}

const AnswerInput = ({ className }: AnswerInputProps) => {
  const { register } = useFormContext()

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">답안 입력</div>
      <textarea
        placeholder="답안을 입력해주세요"
        className="h-[70px] resize-none rounded-[3px] border border-[#DDDDDD] p-[12px] text-[14px] text-[#666666] outline-none"
        {...register('answer', { required: true })}
      />
      <div className="mt-[7px] text-[10px] text-[#666666]">
        * 필수 입력값입니다.
      </div>
    </div>
  )
}
export default AnswerInput
