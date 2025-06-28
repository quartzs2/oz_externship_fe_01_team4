import AnswerRegister from '@components/quizzes/add-quiz-modal/components/AnswerRegister'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'

const TrueOrFalse = () => {
  return (
    <div className="flex flex-col pb-[10px]">
      <QuestionInput />
      <AnswerRegister className="mt-[56px]" />
      <ScoreSelector className="mt-[30px]" />
      <SolutionInput className="mt-[34px]" />
    </div>
  )
}
export default TrueOrFalse
