import type { MultipleChoiceSingleQuestion } from '@custom-types/quizzes/quizTypes'

type MultipleChoiceProps = {
  question: MultipleChoiceSingleQuestion
}

const MultipleChoice = ({ question }: MultipleChoiceProps) => {
  return (
    <div className="flex flex-col gap-y-[12px]">
      {question.options.map((option, index) => (
        <div key={index} className="flex items-center gap-x-[10px]">
          <div className="text-[14px] text-[#666666]">{index + 1}.</div>
          <div className="text-[14px] text-[#222222]">{option}</div>
        </div>
      ))}
    </div>
  )
}

export default MultipleChoice
