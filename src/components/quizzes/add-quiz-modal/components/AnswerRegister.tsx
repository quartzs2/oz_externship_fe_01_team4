import { cn } from '@utils/cn'
import CustomCheckbox from '@components/quizzes/add-quiz-modal/components/CustomCheckbox'
import { useState } from 'react'

type AnswerProps = {
  option: Option
  index: number
  onCorrectChange: (id: number, checked: boolean) => void
  onTextChange: (id: number, text: string) => void
}

const Answer = ({
  option,
  index,
  onCorrectChange,
  onTextChange,
}: AnswerProps) => {
  return (
    <div className="flex items-center">
      <div className="ml-[14px] min-w-[27px] text-[12px] text-[#666666]">
        {index + 1}
      </div>
      <input
        type="text"
        className={cn(
          'h-[30px] w-full',
          'border border-[#DDDDDD] bg-white text-[12px] text-[#666666]',
          'rounded-[3px] pl-[10px] outline-none'
        )}
        placeholder="보기를 입력해주세요."
        value={option.text}
        onChange={(e) => onTextChange(option.id, e.target.value)}
      />
      <CustomCheckbox
        checked={option.isCorrect}
        onChange={(checked) => onCorrectChange(option.id, checked)}
        className="mr-[49px] ml-[23px]"
      />
    </div>
  )
}

type AnswerRegisterProps = {
  className?: string
}

type Option = {
  id: number
  text: string
  isCorrect: boolean
}

const AnswerRegister = ({ className }: AnswerRegisterProps) => {
  const [options, setOptions] = useState<Option[]>([
    { id: 0, text: 'O', isCorrect: true },
    { id: 1, text: 'X', isCorrect: false },
  ])

  const handleCorrectChange = (id: number, checked: boolean) => {
    if (checked) {
      setOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.id === id
            ? { ...option, isCorrect: true }
            : { ...option, isCorrect: false }
        )
      )
    } else {
      setOptions((prevOptions) => {
        const otherOption = prevOptions.find((option) => option.id !== id)
        if (otherOption) {
          return prevOptions.map((option) =>
            option.id === id
              ? { ...option, isCorrect: false }
              : { ...option, isCorrect: true }
          )
        }
        return prevOptions.map((option) =>
          option.id === id ? { ...option, isCorrect: false } : option
        )
      })
    }
  }

  const handleTextChange = (id: number, text: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, text: text } : option
      )
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">정답 등록</div>
      <div className="mt-[6px] text-[10px] text-[#666666]">
        <div>정답 보기는 체크박스를 체크하여 등록해주세요.</div>
      </div>
      <div className="mt-[8px] flex min-h-[121px] flex-col gap-[7px] rounded-[4px] bg-[#F7F7F7] px-[12px] pt-[24px]">
        {options.map((option, index) => (
          <Answer
            key={option.id}
            option={option}
            index={index}
            onCorrectChange={handleCorrectChange}
            onTextChange={handleTextChange}
          />
        ))}
      </div>
    </div>
  )
}
export default AnswerRegister
