import type { ShortAnswerQuestion } from '@custom-types/quizzes/quizTypes'
import { cn } from '@utils/cn'

type ShortAnswerProps = {
  question: ShortAnswerQuestion
}

const ShortAnswer = ({ question }: ShortAnswerProps) => {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[#D9D9D9] px-[14px]',
        'flex h-[34px] w-[600px] items-center',
        'text-[14px] text-[#522193]'
      )}
    >
      {question.answer}
    </div>
  )
}

export default ShortAnswer
