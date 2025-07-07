import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import Dropdown from '@components/common/Dropdown'
import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'
import { Controller, useFormContext } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type QuestionSequenceOptionProps = {
  index: number
  onDelete: () => void
  isDeletable: boolean
  totalOptionsCount: number
}

const QuestionSequenceOption = ({
  index,
  onDelete,
  isDeletable,
  totalOptionsCount,
}: QuestionSequenceOptionProps) => {
  const { register, control } = useFormContext()

  const dropdownOptions: Option[] = Array.from(
    { length: totalOptionsCount },
    (_, i) => ({
      label: String(i + 1),
      value: String(i + 1),
    })
  )

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}.
      </div>
      <input
        {...register(`options.${index}.text`, {
          required: '보기를 입력해주세요.',
        })}
        type="text"
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="보기를 입력해주세요."
      />
      <Controller
        control={control}
        name={`options.${index}.order`}
        render={({ field }) => (
          <Dropdown
            id={`sequence-dropdown-${index}`}
            name={field.name}
            value={field.value}
            onChange={(selectedOption: Option) =>
              field.onChange(selectedOption.value)
            }
            options={dropdownOptions}
            wrapClassName="ml-[15px] w-[43px] h-[24px]"
          />
        )}
      />

      <button type="button" onClick={onDelete} disabled={!isDeletable}>
        <Icon
          icon={DeleteIcon}
          size={12}
          className={cn('mr-[25px] ml-[11px]', {
            'cursor-not-allowed opacity-50': !isDeletable,
          })}
        />
      </button>
    </div>
  )
}
export default QuestionSequenceOption
