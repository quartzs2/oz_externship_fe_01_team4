import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SequenceViewRegister from '@components/quizzes/add-quiz-modal/components/SequenceViewRegister'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'

const SortByOrder = () => {
  return (
    <div className="flex flex-col pb-[10px]">
      <QuestionInput />
      <SequenceViewRegister className="mt-[56px]" />
      <ScoreSelector className="mt-[30px]" />
      <SolutionInput className="mt-[34px]" />
    </div>
  )
}
export default SortByOrder
