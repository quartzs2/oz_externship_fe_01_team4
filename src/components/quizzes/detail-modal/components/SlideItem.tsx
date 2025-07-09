import MultipleChoiceMulti from '@components/quizzes/detail-modal/components/questions/MultipleChoiceMulti'
import MultipleChoiceSingle from '@components/quizzes/detail-modal/components/questions/MultipleChoiceSingle'
import Ordering from '@components/quizzes/detail-modal/components/questions/Ordering'
import Ox from '@components/quizzes/detail-modal/components/questions/Ox'
import type { Question } from '@custom-types/quizzes/quizTypes'
import { parseQuestionTypeToString } from '@utils/question/parseQuestionType'

interface SlideItemProps {
  question: Question
  index: number
}

const SlideItem = ({ question, index }: SlideItemProps) => {
  const renderQuestionComponent = () => {
    switch (question.type) {
      case 'multiple_choice_single':
        return <MultipleChoiceSingle question={question} />
      case 'multiple_choice_multi':
        return <MultipleChoiceMulti question={question} />
      case 'ox':
        return <Ox question={question} />
      case 'ordering':
        return <Ordering question={question} />
      case 'fill_in_blank':
        return '빈칸 채우기'
      case 'short_answer':
        return '주관식 단답형'
      default:
        return <div>지원하지 않는 문제 유형입니다</div>
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between p-[30px]">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-[#666666]">
            {parseQuestionTypeToString({ questionType: question.type })}
          </div>
          <div>{/* TODO: 버튼 영역 */} 버튼 영역</div>
        </div>
        <div className="mt-[20px] text-[20px] font-semibold text-[#222222]">
          {index + 1}. {question.question}({question.point}점)
        </div>
        <div className="mt-[20px] text-[16px] font-semibold">
          정답 :{' '}
          <span className="text-[#522193]">
            {JSON.stringify(question.answer)}
          </span>
        </div>
      </div>
      <div className="mt-[40px]">{renderQuestionComponent()}</div>
      <div className="h-[120px] rounded-[12px] bg-[#F7F7F7] p-[25px] text-[16px] font-semibold">
        <div className="text-[#222222]">해설</div>
        <div className="text-[#666666]">{question.explanation}</div>
      </div>
    </div>
  )
}

export default SlideItem
