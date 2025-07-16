import AnswerCircle from '@components/quizzes/detail-modal/components/AnswerCircle'
import type { MultipleChoiceSingleQuestion } from '@custom-types/quizzes/quizTypes'
import { cn } from '@utils/cn'

type MultipleChoiceSingleProps = {
  question: MultipleChoiceSingleQuestion
}

const MultipleChoiceSingle = ({ question }: MultipleChoiceSingleProps) => {
  return (
    <div className="flex flex-col gap-[38px]">
      {question.options.map((option, index) => {
        const isCorrectAnswer =
          question.answer === option || question.answer[0] === option

        return (
          <div key={index} className="flex items-center gap-[23px]">
            <AnswerCircle isAnswer={isCorrectAnswer}>
              {['A', 'B', 'C', 'D'][index]}
            </AnswerCircle>
            <div
              className={cn('text-[16px] font-semibold text-[#666666]', {
                'text-[#522193]': isCorrectAnswer,
              })}
            >
              {option}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MultipleChoiceSingle
