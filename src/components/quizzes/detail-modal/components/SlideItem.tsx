import Icon from '@components/common/Icon'
import FillInBlank from '@components/quizzes/detail-modal/components/questions/FillInBlank'
import MultipleChoiceMulti from '@components/quizzes/detail-modal/components/questions/MultipleChoiceMulti'
import MultipleChoiceSingle from '@components/quizzes/detail-modal/components/questions/MultipleChoiceSingle'
import Ordering from '@components/quizzes/detail-modal/components/questions/Ordering'
import Ox from '@components/quizzes/detail-modal/components/questions/Ox'
import ShortAnswer from '@components/quizzes/detail-modal/components/questions/ShortAnswer'
import type { Question } from '@custom-types/quizzes/quizTypes'
import { parseQuestionTypeToString } from '@utils/question/parseQuestionType'
import AddQuestionIcon from '@assets/icons/quizzes/detail-modal/addQuestion.svg?react'
import EditQuestionIcon from '@assets/icons/quizzes/detail-modal/editQuestion.svg?react'
import DeleteQuestionIcon from '@assets/icons/quizzes/detail-modal/deleteQuestion.svg?react'
import { type Dispatch, type SetStateAction } from 'react'

interface SlideItemProps {
  question: Question
  index: number
  setIsAddQuizModalOpen: (isOpen: boolean) => void
  setQuestions: Dispatch<SetStateAction<Question[]>>
  onQuestionEdit?: (question: Question) => void
}

const SlideItem = ({
  question,
  index,
  setIsAddQuizModalOpen,
  setQuestions,
  onQuestionEdit,
}: SlideItemProps) => {
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
        return <FillInBlank question={question} />
      case 'short_answer':
        return <ShortAnswer question={question} />
      default:
        return <div>지원하지 않는 문제 유형입니다</div>
    }
  }

  const handleDeleteQuestion = () => {
    setQuestions((prevQuestions: Question[]) =>
      prevQuestions.filter((_, i) => i !== index)
    )
  }

  const handleEditQuestion = () => {
    if (onQuestionEdit) {
      onQuestionEdit(question)
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between p-[30px]">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-[#666666]">
            {parseQuestionTypeToString({ questionType: question.type })}
          </div>
          <div className="flex items-center gap-[10px]">
            {/* 문제 추가 버튼 */}
            <button onClick={() => setIsAddQuizModalOpen(true)}>
              <Icon icon={AddQuestionIcon} size={24} />
            </button>
            {/* 문제 수정 버튼 */}
            <button onClick={handleEditQuestion}>
              <Icon icon={EditQuestionIcon} size={24} />
            </button>
            {/* 문제 삭제 버튼 */}
            <button onClick={handleDeleteQuestion}>
              <Icon icon={DeleteQuestionIcon} size={24} />
            </button>
          </div>
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
