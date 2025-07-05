import Button from '@components/common/Button'
import PopUp from '@components/common/PopUp'
import BlankAnswerRegister from '@components/quizzes/add-quiz-modal/components/blank-answer-register/BlankAnswerRegister'
import PassageInput from '@components/quizzes/add-quiz-modal/components/PassageInput'
import QuestionInput from '@components/quizzes/add-quiz-modal/components/QuestionInput'
import ScoreSelector from '@components/quizzes/add-quiz-modal/components/ScoreSelector'
import SolutionInput from '@components/quizzes/add-quiz-modal/components/SolutionInput'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import type { FormHandle, FillInTheBlanksFormValues } from '@custom-types/quiz'
import { useImperativeHandle, useState, type Ref } from 'react'
import {
  FormProvider,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from 'react-hook-form'

type FillInTheBlanksProps = {
  ref: Ref<FormHandle>
}

const FillInTheBlanks = ({ ref }: FillInTheBlanksProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const methods = useForm<FillInTheBlanksFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      passage: '',
      options: [{ text: '', isCorrect: true }],
      score: '1',
      solution: '',
    },
  })

  const onSubmit: SubmitHandler<FillInTheBlanksFormValues> = (data) => {
    console.log(data)
    // TODO: 문제 추가
  }

  const onError = (errors: FieldErrors<FillInTheBlanksFormValues>) => {
    // TODO: 에러 표시
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
        <PopUp.Description>{popupMessage}</PopUp.Description>
        <PopUp.Buttons>
          <Button onClick={() => setIsPopupOpen(false)}>확인</Button>
        </PopUp.Buttons>
      </PopUp>
    </FormProvider>
  )
}
export default FillInTheBlanks
