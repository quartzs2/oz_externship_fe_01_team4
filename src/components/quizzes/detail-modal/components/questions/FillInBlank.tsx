import type { FillInBlankQuestion } from '@custom-types/quizzes/quizTypes'
import { cn } from '@utils/cn'

type FillInBlankProps = {
  question: FillInBlankQuestion
}

const FillInBlank = ({ question }: FillInBlankProps) => {
  return (
    <div className="flex flex-col gap-[27px]">
      <div className="flex h-[80px] w-[600px] items-center rounded-[8px] border border-[#D9D9D9] px-[14px] text-[14px] text-[#222222]">
        {question.prompt}
      </div>
      <div className="flex gap-[40px]">
        {question.answer.map((answer, index) => {
          return (
            <div key={index} className="flex items-center gap-[12px]">
              <div className="text-[16px] font-semibold text-[#666666]">
                {['(A)', '(B)', '(C)', '(D)'][index]}
              </div>
              <div
                className={cn(
                  'rounded-[8px] border border-[#D9D9D9] px-[14px]',
                  'flex h-[34px] w-[200px] items-center',
                  'text-[14px] text-[#522193]'
                )}
              >
                {answer}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FillInBlank
