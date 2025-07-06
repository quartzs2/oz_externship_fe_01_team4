import Answer from '@components/quizzes/add-quiz-modal/components/answer-register/Answer'
import { cn } from '@utils/cn'
import { useFieldArray, useFormContext } from 'react-hook-form'

type AnswerRegisterProps = {
  className?: string
}

const AnswerRegister = ({ className }: AnswerRegisterProps) => {
  const { control, setValue } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name: 'options',
  })

  const handleCorrectChange = (selectedIndex: number) => {
    fields.forEach((_, index) => {
      setValue(`options.${index}.isCorrect`, index === selectedIndex, {
        shouldDirty: true,
      })
    })
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">정답 등록</div>
      <div className="mt-[6px] text-[10px] text-[#666666]">
        <div>정답 보기는 체크박스를 체크하여 등록해주세요.</div>
      </div>
      <div className="mt-[8px] flex min-h-[121px] flex-col gap-[7px] rounded-[4px] bg-[#F7F7F7] px-[12px] pt-[24px]">
        {fields.map((field, index) => (
          <Answer
            key={field.id}
            index={index}
            onCorrectChange={handleCorrectChange}
          />
        ))}
      </div>
    </div>
  )
}
export default AnswerRegister
