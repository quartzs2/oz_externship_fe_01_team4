import Button from '@components/common/Button'
import PopUp from '@components/common/PopUp'
import type {
  ValidateFunctionProps,
  ValidateFunctionReturn,
} from '@components/quizzes/add-quiz-modal/AddQuizModal'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SequenceViewRegister from '@components/quizzes/add-quiz-modal/components/sequence-view-register/SequenceViewRegister'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import type {
  FormHandle,
  SortByOrderFormValues,
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
} from 'react'
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form'

type SortByOrderProps = {
  ref: Ref<FormHandle>
  validateFunction: (props: ValidateFunctionProps) => ValidateFunctionReturn
  setQuizzes: Dispatch<SetStateAction<Question[]>>
}

const SortByOrder = ({
  ref,
  validateFunction,
  setQuizzes,
}: SortByOrderProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupTitle, setPopupTitle] = useState<ReactNode>('')
  const [popupDescription, setPopupDescription] = useState<ReactNode>('')

  const methods = useForm<Omit<SortByOrderFormValues, 'type'>>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      options: [
        { text: '', order: '1' },
        { text: '', order: '2' },
      ],
      score: '1',
      solution: '',
    },
  })

  const onSubmit: SubmitHandler<Omit<SortByOrderFormValues, 'type'>> = (
    data
  ) => {
    const orders = data.options.map((option) => option.order)
    const hasDuplicateOrders = new Set(orders).size !== orders.length
    if (hasDuplicateOrders) {
      setPopupTitle('순서가 중복되었습니다.')
      setPopupDescription('각 보기의 순서가 겹치지 않도록 다시 지정해주세요.')
      setIsPopupOpen(true)
      return
    }

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
      id: Date.now(), // 임시 id, 실제 구현에 맞게 수정 필요
      type: 'ordering',
      question: data.question,
      point: Number(data.score),
      prompt: null,
      options: data.options.map((opt) => opt.text),
      answer: data.options
        .sort((a, b) => Number(a.order) - Number(b.order))
        .map((opt) => opt.text),
      explanation: data.solution,
    }

    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz])
  }

  const onError = (errors: FieldErrors<SortByOrderFormValues>) => {
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
        <SequenceViewRegister className="mt-[56px]" />
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
export default SortByOrder
