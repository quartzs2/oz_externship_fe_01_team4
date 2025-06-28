import BlankAnswerRegister from '@components/quizzes/add-quiz-modal/components/BlankAnswerRegister'
import PassageInput from '@components/quizzes/add-quiz-modal/components/PassageInput'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'

const FillInTheBlanks = () => {
  return (
    <div className="flex flex-col pb-[10px]">
      <QuestionInput />
      <PassageInput className="mt-[36px]" />
      <BlankAnswerRegister className="mt-[38px]" />
      <ScoreSelector className="mt-[30px]" />
      <SolutionInput className="mt-[34px]" />
    </div>
  )
}
export default FillInTheBlanks
