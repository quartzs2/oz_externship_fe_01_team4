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
  TrueOrFalseFormValues,
} from '@custom-types/quizzes/quizFormTypes'
import type { Question } from '@custom-types/quizzes/quizTypes'
import findFirstErrorMessage from '@utils/findFirstErrorMessage'
import {
  useImperativeHandle,
  useState,
  type Dispatch,
  type ReactNode,
  type Ref,
  type SetStateAction,
  useEffect,
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
  setQuizzes: Dispatch<SetStateAction<Question[]>>
  onClose: () => void
  mode?: 'add' | 'edit'
  editQuestion?: Question
  onEditSuccess?: () => void
}

const TrueOrFalse = ({
  ref,
  validateFunction,
  setQuizzes,
  onClose,
  mode = 'add',
  editQuestion,
  onEditSuccess,
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

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (mode === 'edit' && editQuestion) {
      const options = editQuestion.options.map((option) => ({
        text: option,
        isCorrect: option === editQuestion.answer,
      }))

      methods.reset({
        question: editQuestion.question,
        options,
        score: editQuestion.point.toString(),
        solution: editQuestion.explanation || '',
      })
    }
  }, [mode, editQuestion, methods])

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

    // Question 타입에 맞게 변환
    const newQuiz: Question = {
      id: editQuestion?.id || Date.now(),
      type: 'ox',
      question: data.question,
      point: Number(data.score),
      prompt: null,
      options: data.options.map((opt) => opt.text),
      answer: data.options.find((opt) => opt.isCorrect)?.text || '',
      explanation: data.solution,
    }

    if (mode === 'edit') {
      // 수정 모드: 기존 문제를 새 문제로 교체
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === editQuestion?.id ? newQuiz : quiz
        )
      )
      onEditSuccess?.()
    } else {
      // 추가 모드: 새 문제 추가
      setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz])
    }

    onClose()
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
