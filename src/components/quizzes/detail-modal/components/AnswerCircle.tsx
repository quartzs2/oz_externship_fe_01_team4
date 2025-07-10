import Icon from '@components/common/Icon'
import { cn } from '@utils/cn'
import CheckIcon from '@assets/icons/quizzes/detail-modal/checkIcon.svg?react'

type AnswerCircleType = {
  children: React.ReactNode
  isAnswer: boolean
}

const AnswerCircle = ({ children, isAnswer }: AnswerCircleType) => {
  if (isAnswer) {
    return <Icon icon={CheckIcon} size={24} />
  }

  return (
    <div
      className={cn(
        'flex h-[24px] w-[24px] items-center justify-center rounded-[50%] bg-[#ECECEC]',
        'text-[14px] font-semibold text-[#86838B]'
      )}
    >
      {children}
    </div>
  )
}
export default AnswerCircle
