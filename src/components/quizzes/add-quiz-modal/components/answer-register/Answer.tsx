import CustomCheckbox from '@components/quizzes/add-quiz-modal/components/common/CustomCheckbox'
import type { TrueOrFalseFormValues } from '@custom-types/quiz'
import { cn } from '@utils/cn'
import { Controller, useFormContext } from 'react-hook-form'

export type Option = {
  id: number
  text: string
  isCorrect: boolean
}

type AnswerProps = {
  index: number
  onCorrectChange: (id: number) => void
}

const Answer = ({ index, onCorrectChange }: AnswerProps) => {
  const { control, watch } = useFormContext<TrueOrFalseFormValues>()

  const optionValue = watch(`options.${index}`)

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}
      </div>
      <input
        type="text"
        disabled
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        value={optionValue.text}
      />
      <Controller
        control={control}
        name={`options.${index}.isCorrect`}
        render={({ field }) => (
          <CustomCheckbox
            checked={field.value}
            onChange={() => onCorrectChange(index)}
            className="mr-[49px] ml-[23px]"
          />
        )}
      />
    </div>
  )
}
export default Answer
