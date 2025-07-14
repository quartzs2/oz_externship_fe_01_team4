import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import Icon from '@components/common/Icon'
import type { FillInTheBlanksFormValues } from '@custom-types/quizzes/quizFormTypes'
import { cn } from '@utils/cn'
import { useFormContext } from 'react-hook-form'

type BlankQuestionOptionProps = {
  index: number
  onDelete: () => void
  isDeletable: boolean
}

const BlankQuestionOption = ({
  index,
  onDelete,
  isDeletable,
}: BlankQuestionOptionProps) => {
  const { register } = useFormContext<FillInTheBlanksFormValues>()

  const optionLabel = String.fromCharCode(65 + index)

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {`(${optionLabel})`}
      </div>
      <input
        type="text"
        {...register(`options.${index}.text`, {
          required: '답안을 입력해주세요.',
        })}
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="답안을 입력해주세요."
      />

      <button type="button" onClick={onDelete} disabled={!isDeletable}>
        <Icon
          icon={DeleteIcon}
          size={12}
          className={cn('mr-[25px] ml-[20px]', {
            'cursor-not-allowed opacity-50': !isDeletable,
          })}
        />
      </button>
    </div>
  )
}
export default BlankQuestionOption
