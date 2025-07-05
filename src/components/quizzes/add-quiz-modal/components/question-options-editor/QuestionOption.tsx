import CustomCheckbox from '@components/quizzes/add-quiz-modal/components/common/CustomCheckbox'
import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'
import { Controller, useFormContext } from 'react-hook-form'

type QuestionOptionProps = {
  option: { id: string; text: string; isCorrect: boolean }
  index: number
  onDelete: (id: string) => void
  isDeletable: boolean
}

const QuestionOption = ({
  option,
  index,
  onDelete,
  isDeletable,
}: QuestionOptionProps) => {
  const { register, control } = useFormContext()

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}.
      </div>
      <input
        type="text"
        {...register(`options.${index}.text`, {
          required: '보기 내용을 입력해주세요.',
        })}
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="보기를 입력해주세요."
      />
      <Controller
        name={`options.${index}.isCorrect`}
        control={control}
        render={({ field }) => (
          <CustomCheckbox
            checked={field.value}
            onChange={field.onChange}
            className="ml-[23px]"
          />
        )}
      />
      <button onClick={() => onDelete(option.id)} disabled={!isDeletable}>
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

export default QuestionOption
