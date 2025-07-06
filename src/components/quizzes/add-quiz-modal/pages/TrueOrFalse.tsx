import Button from '@components/common/Button'
import PopUp from '@components/common/PopUp'
import type {
  ValidateFunctionProps,
  ValidateFunctionReturn,
} from '@components/quizzes/add-quiz-modal/AddQuizModal'
import AnswerRegister from '@components/quizzes/add-quiz-modal/components/answer-register/AnswerRegister'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import type {
  FormHandle,
  QuizFormTypes,
  TrueOrFalseFormValues,
} from '@custom-types/quiz'
import findFirstErrorMessage from '@utils/findFirstErrorMessage'
import {
  useImperativeHandle,
  useState,
  type Dispatch,
  type ReactNode,
  type Ref,
  type SetStateAction,
} from 'react'
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form'

type TrueOrFalseProps = {
  ref: Ref<FormHandle>
  validateFunction: (props: ValidateFunctionProps) => ValidateFunctionReturn
  setQuizzes: Dispatch<SetStateAction<QuizFormTypes[]>>
}

const TrueOrFalse = ({
  ref,
  validateFunction,
  setQuizzes,
}: TrueOrFalseProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupTitle, setPopupTitle] = useState<ReactNode>('')
  const [popupDescription, setPopupDescription] = useState<ReactNode>('')

  const methods = useForm<Omit<TrueOrFalseFormValues, 'types'>>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      options: [
        { text: 'O', isCorrect: true },
        { text: 'X', isCorrect: false },
      ],
      score: '1',
      solution: '',
    },
  })

  const onSubmit: SubmitHandler<Omit<TrueOrFalseFormValues, 'type'>> = (
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

    const newQuiz: TrueOrFalseFormValues = {
      ...data,
      type: 'true-or-false',
    }

    console.log(newQuiz)
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz])
  }

  const onError = (errors: FieldErrors<TrueOrFalseFormValues>) => {
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
        <AnswerRegister className="mt-[56px]" />
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
export default TrueOrFalse
