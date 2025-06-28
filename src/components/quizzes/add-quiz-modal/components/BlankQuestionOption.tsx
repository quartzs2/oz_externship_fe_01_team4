import Icon from '@components/common/Icon'
import DeleteIcon from '@assets/icons/quizzes/add-quiz-modal/delete.svg?react'
import { cn } from '@utils/cn'

type Option = {
  id: number
  text: string
  isCorrect: boolean
}

type BlankQuestionOptionProps = {
  option: Option
  index: number
  onTextChange: (id: number, text: string) => void
  onDelete: (id: number) => void
  isDeletable: boolean
}

const BlankQuestionOption = ({
  option,
  index,
  onTextChange,
  onDelete,
  isDeletable,
}: BlankQuestionOptionProps) => {
  const optionLabel = String.fromCharCode(65 + index) // A, B, C, D...

  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {`(${optionLabel})`}
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
        placeholder="답안을 입력해주세요."
      />

      <button onClick={() => onDelete(option.id)} disabled={!isDeletable}>
        <Icon
          icon={DeleteIcon}
          size={12}
          className={cn(
            'mr-[25px] ml-[20px]',
            { 'cursor-not-allowed opacity-50': !isDeletable } // 삭제 불가능할 때 스타일
          )}
        />
      </button>
    </div>
  )
}
export default BlankQuestionOption
