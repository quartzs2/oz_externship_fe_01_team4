import Icon from '@components/common/Icon'
import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import { cn } from '@utils/cn'
import Dropdown from '@components/common/Dropdown'
import { useState } from 'react'

type QuestionSequenceOptionProps = {
  option: { id: number; text: string; isCorrect: boolean }
  index: number
  onTextChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  isDeletable: boolean
  totalOptionsCount: number
}

const QuestionSequenceOption = ({
  option,
  index,
  onTextChange,
  onDelete,
  isDeletable,
  totalOptionsCount,
}: QuestionSequenceOptionProps) => {
  const [currentDropdownValue, setCurrentDropdownValue] = useState(
    String(index + 1)
  )

  const dropdownOptions = Array.from({ length: totalOptionsCount }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }))

  const handleDropdownChange = (value: string) => {
    setCurrentDropdownValue(value)
  }

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}.
      </div>
      <input
        type="text"
        value={option.text}
        onChange={(e) => onTextChange(option.id, e.target.value)}
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="보기를 입력해주세요."
      />
      <Dropdown
        id={`sequence-dropdown-${option.id}`}
        name={`sequence-dropdown-${option.id}`}
        value={currentDropdownValue}
        onChange={handleDropdownChange}
        options={dropdownOptions}
        wrapClassName="ml-[15px] w-[43px] h-[24px]"
      />

      <button onClick={() => onDelete(option.id)} disabled={!isDeletable}>
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
