import type { OrderingQuestion } from '@custom-types/quizzes/quizTypes'
import { cn } from '@utils/cn'

type OrderingProps = {
  question: OrderingQuestion
}

const Ordering = ({ question }: OrderingProps) => {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-[#D9D9D9] px-[30px] py-[16px]',
        'flex h-[170px] w-[450px] flex-col justify-center gap-[6px]'
      )}
    >
      {question.answer.map((answer, index) => {
        const order = ['A', 'B', 'C', 'D'][question.options.indexOf(answer)]

        return (
          <div key={index} className="text-[14px] text-[#666666]">
            ({order}) {answer}
          </div>
        )
      })}
    </div>
  )
}

export default Ordering
