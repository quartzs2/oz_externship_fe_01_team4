import Button from '@components/common/Button'
import PopUp from '@components/common/PopUp'
import type {
  ValidateFunctionProps,
  ValidateFunctionReturn,
} from '@components/quizzes/add-quiz-modal/AddQuizModal'
import BlankAnswerRegister from '@components/quizzes/add-quiz-modal/components/blank-answer-register/BlankAnswerRegister'
import PassageInput from '@components/quizzes/add-quiz-modal/components/PassageInput'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import type {
  FillInTheBlanksFormValues,
  FormHandle,
} from '@custom-types/quizzes/quizFormTypes'
import type { Question } from '@custom-types/quizzes/quizTypes'
import findFirstErrorMessage from '@utils/findFirstErrorMessage'
import {
  type Dispatch,
  type ReactNode,
  type Ref,
  type SetStateAction,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form'

type FillInTheBlanksProps = {
  ref: Ref<FormHandle>
  validateFunction: (props: ValidateFunctionProps) => ValidateFunctionReturn
  setQuizzes: Dispatch<SetStateAction<Question[]>>
  onClose: () => void
  mode?: 'add' | 'edit'
  editQuestion?: Question
  onEditSuccess?: () => void
}

const FillInTheBlanks = ({
  ref,
  validateFunction,
  setQuizzes,
  onClose,
  mode = 'add',
  editQuestion,
  onEditSuccess,
}: FillInTheBlanksProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupTitle, setPopupTitle] = useState<ReactNode>('')
  const [popupDescription, setPopupDescription] = useState<ReactNode>('')

  const methods = useForm<Omit<FillInTheBlanksFormValues, 'type'>>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      passage: '',
      options: [{ text: '', order: 'A' }],
      score: '1',
      solution: '',
    },
  })

  // 수정 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (mode === 'edit' && editQuestion) {
      const answers = Array.isArray(editQuestion.answer)
        ? editQuestion.answer
        : [editQuestion.answer]

      const options = answers.map((answer, index) => ({
        text: answer,
        order: String.fromCharCode(65 + index), // A, B, C, ...
      }))

      methods.reset({
        question: editQuestion.question,
        passage: editQuestion.prompt || '',
        options,
        score: editQuestion.point.toString(),
        solution: editQuestion.explanation || '',
      })
    }
  }, [mode, editQuestion, methods])

  const onSubmit: SubmitHandler<Omit<FillInTheBlanksFormValues, 'type'>> = (
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
      type: 'fill_in_blank',
      question: data.question,
      point: Number(data.score),
      prompt: data.passage,
      options: [],
      answer: data.options.map((option) => option.text),
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

  const onError = (errors: FieldErrors<FillInTheBlanksFormValues>) => {
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
        <PassageInput className="mt-[36px]" />
        <BlankAnswerRegister className="mt-[38px]" />
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
export default FillInTheBlanks
