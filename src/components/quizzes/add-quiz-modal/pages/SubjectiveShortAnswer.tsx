import AnswerInput from '@components/quizzes/add-quiz-modal/components/AnswerInput'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'

const SubjectiveShortAnswer = () => {
  return (
    <div className="flex flex-col pb-[10px]">
      <QuestionInput />
      <AnswerInput className="mt-[32px]" />
      <ScoreSelector className="mt-[30px]" />
      <SolutionInput className="mt-[34px]" />
    </div>
  )
}
export default SubjectiveShortAnswer
