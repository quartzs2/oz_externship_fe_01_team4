import type { FillInBlankQuestion } from '@custom-types/quizzes/quizTypes'

type FillInBlankProps = {
  question: FillInBlankQuestion
}

const FillInBlank = ({ question }: FillInBlankProps) => {
  return (
    <div className="h-[200px]">
      <div className="flex h-[34px] w-[600px] items-center rounded-[8px] border border-[#D9D9D9] px-[14px] text-[14px] text-[#522193]">
        {question.answer}
      </div>
    </div>
  )
}

export default FillInBlank
