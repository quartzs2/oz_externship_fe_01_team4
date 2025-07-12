import Button from '@components/common/Button'
import PopUp from '@components/common/PopUp'
import type {
  ValidateFunctionProps,
  ValidateFunctionReturn,
} from '@components/quizzes/add-quiz-modal/AddQuizModal'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import QuestionOptionsEditor from '@components/quizzes/add-quiz-modal/components/question-options-editor/QuestionOptionsEditor'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import type {
  FormHandle,
  MultipleChoiceFormValues,
} from '@custom-types/quizzes/quizFormTypes'
import type { Question } from '@custom-types/quizzes/quizTypes'
import findFirstErrorMessage from '@utils/findFirstErrorMessage'
import {
  type ReactNode,
  useImperativeHandle,
  useState,
  type Ref,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form'

type MultipleChoiceProps = {
  ref: Ref<FormHandle>
  validateFunction: (props: ValidateFunctionProps) => ValidateFunctionReturn
  setQuizzes: Dispatch<SetStateAction<Question[]>>
  onClose: () => void
}

const MultipleChoice = ({
  ref,
  validateFunction,
  setQuizzes,
  onClose,
}: MultipleChoiceProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupTitle, setPopupTitle] = useState<ReactNode>('')
  const [popupDescription, setPopupDescription] = useState<ReactNode>('')

  const methods = useForm<Omit<MultipleChoiceFormValues, 'type'>>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ],
      score: '1',
      solution: '',
    },
  })

  const onSubmit: SubmitHandler<Omit<MultipleChoiceFormValues, 'type'>> = (
    data
  ) => {
    const { isError, PopupTitle, PopupDetail } = validateFunction({
      QuizScore: Number(data.score),
    })

    if (isError && PopupTitle && PopupDetail) {
      setPopupTitle(PopupTitle)
      setPopupDescription(PopupDetail)
      setIsPopupOpen(true)
      return
    }

    // 정답 개수에 따라 타입 결정
    const correctAnswers = data.options.filter((opt) => opt.isCorrect)
    const isSingleChoice = correctAnswers.length === 1

    // Question 타입에 맞게 변환
    const newQuiz: Question = isSingleChoice
      ? {
          id: Date.now(), // 임시 id, 실제 구현에 맞게 수정 필요
          type: 'multiple_choice_single',
          question: data.question,
          point: Number(data.score),
          prompt: null,
          options: data.options.map((opt) => opt.text),
          answer: correctAnswers[0].text, // 단일 정답
          explanation: data.solution,
        }
      : {
          id: Date.now(), // 임시 id, 실제 구현에 맞게 수정 필요
          type: 'multiple_choice_multi',
          question: data.question,
          point: Number(data.score),
          prompt: null,
          options: data.options.map((opt) => opt.text),
          answer: correctAnswers.map((opt) => opt.text), // 다중 정답
          explanation: data.solution,
        }

    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz])
    onClose()
  }

  const onError = (errors: FieldErrors<MultipleChoiceFormValues>) => {
    const errorEntries = Object.values(errors)

    if (errorEntries.length === 0) {
      setPopupTitle('오류가 발생했습니다.')
      setIsPopupOpen(true)
      return
    }

    const firstErrorMessage = findFirstErrorMessage(errorEntries[0])
    setPopupTitle(firstErrorMessage || '오류가 발생했습니다.')

    setIsPopupOpen(true)
  }

  useImperativeHandle(ref, () => ({
    submit: () => {
      methods.handleSubmit(onSubmit, onError)()
    },
  }))

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col pb-[10px]"
      >
        <QuestionInput />
        <QuestionOptionsEditor className="mt-[56px]" />
        <ScoreSelector className="mt-[30px]" />
        <SolutionInput className="mt-[34px]" />
      </form>

      <PopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type={POP_UP_TYPE.DELETE_CONFIRM}
      >
        <PopUp.Title>{popupTitle}</PopUp.Title>
        <PopUp.Description>{popupDescription}</PopUp.Description>
        <PopUp.Buttons>
          <Button onClick={() => setIsPopupOpen(false)}>확인</Button>
        </PopUp.Buttons>
      </PopUp>
    </FormProvider>
  )
}
export default MultipleChoice
