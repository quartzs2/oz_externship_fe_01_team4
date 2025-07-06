import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import Sidebar from '@components/quizzes/add-quiz-modal/components/common/Sidebar'
import FillInTheBlanks from '@components/quizzes/add-quiz-modal/pages/FillInTheBlanks'
import MultipleChoice from '@components/quizzes/add-quiz-modal/pages/MultipleChoice'
import SortByOrder from '@components/quizzes/add-quiz-modal/pages/SortByOrder'
import SubjectiveShortAnswer from '@components/quizzes/add-quiz-modal/pages/SubjectiveShortAnswer'
import TrueOrFalse from '@components/quizzes/add-quiz-modal/pages/TrueOrFalse'
import { PADDING_SIZE } from '@constants/modal/modal'
import { type FormHandle, type QuizFormTypes } from '@custom-types/quiz'
import {
  useRef,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from 'react'

export type ValidateFunctionProps = {
  QuizScore: number
}
export type ValidateFunctionReturn = {
  isError: boolean
  PopupTitle: JSX.Element | null
  PopupDetail: JSX.Element | null
}

type AddQuizModalProps = {
  isOpen: boolean
  onClose: () => void
  currentQuizCount: number
  maxQuizCount: number
  currentQuizScoreSum: number
  maxQuizScoreSum: number
  setQuizzes: Dispatch<SetStateAction<QuizFormTypes[]>>
}

const AddQuizModal = ({
  isOpen,
  onClose,
  currentQuizCount,
  maxQuizCount,
  currentQuizScoreSum,
  maxQuizScoreSum = 100,
  setQuizzes,
}: AddQuizModalProps) => {
  const [currentTab, setCurrentTab] = useState(0)

  const pageRefs = useRef<(FormHandle | null)[]>([])

  const validateFunction = ({
    QuizScore,
  }: ValidateFunctionProps): ValidateFunctionReturn => {
    // 문제 개수가 최대 개수 초과일 경우
    if (currentQuizCount >= maxQuizCount) {
      const PopupTitle = () => {
        return (
          <div>
            총 문제 수는 <span>{maxQuizCount}</span>개를 초과할 수 없습니다.
          </div>
        )
      }
      const PopupDetail = () => {
        return (
          <div>
            최대 추가 가능한 문제는 <span>{maxQuizCount}</span>개 입니다.
          </div>
        )
      }

      return {
        isError: true,
        PopupTitle: <PopupTitle />,
        PopupDetail: <PopupDetail />,
      }
    }
    // 기존 문제 배점 합계와 현재 문제 점수를 더했을 때 최대점수를 초과하는 경우
    if (QuizScore + currentQuizScoreSum > maxQuizScoreSum) {
      const PopupTitle = () => {
        return (
          <div>배점의 합계는 {maxQuizScoreSum}점을 초과할 수 없습니다.</div>
        )
      }
      const PopupDetail = () => {
        return (
          <div>
            <div>배점의 합계가 {maxQuizScoreSum}이 초과하지 않도록</div>
            <div>각 문제의 배점을 조율해야 합니다.</div>
          </div>
        )
      }

      return {
        isError: true,
        PopupTitle: <PopupTitle />,
        PopupDetail: <PopupDetail />,
      }
    }
    // 에러가 없는 경우 기본값
    return {
      isError: false,
      PopupTitle: null,
      PopupDetail: null,
    }
  }

  const SIDEBAR_ITEMS = [
    {
      title: '다지선다형',
      page: (
        <MultipleChoice
          ref={(el) => {
            pageRefs.current[0] = el
          }}
          validateFunction={validateFunction}
          setQuizzes={setQuizzes}
        />
      ),
    },
    {
      title: '참/거짓형 (O/X)',
      page: (
        <TrueOrFalse
          ref={(el) => {
            pageRefs.current[1] = el
          }}
          validateFunction={validateFunction}
          setQuizzes={setQuizzes}
        />
      ),
    },
    {
      title: '순서 정렬',
      page: (
        <SortByOrder
          ref={(el) => {
            pageRefs.current[2] = el
          }}
          validateFunction={validateFunction}
          setQuizzes={setQuizzes}
        />
      ),
    },
    {
      title: '주관식 단답형',
      page: (
        <SubjectiveShortAnswer
          ref={(el) => {
            pageRefs.current[3] = el
          }}
          validateFunction={validateFunction}
          setQuizzes={setQuizzes}
        />
      ),
    },
    {
      title: '빈칸 채우기',
      page: (
        <FillInTheBlanks
          ref={(el) => {
            pageRefs.current[4] = el
          }}
        />
      ),
    },
  ]

  const handleAddQuiz = () => {
    const currentPageSubmit = pageRefs.current[currentTab]?.submit
    if (currentPageSubmit) {
      currentPageSubmit()
    }
  }

  return (
    <Modal
      modalId="quizzes-add-quiz-modal"
      isOpen={isOpen}
      onClose={onClose}
      paddingSize={PADDING_SIZE.NONE}
      closeButtonOffset={26}
      className="h-[750px] w-[790px] flex-row"
    >
      <Sidebar
        items={SIDEBAR_ITEMS}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="mt-[75px] flex w-full flex-col justify-between">
        <div className="flex flex-col overflow-y-auto px-[24px]">
          {SIDEBAR_ITEMS[currentTab].page}
        </div>
        <div className="flex justify-end pr-[30px] pb-[30px]">
          <Button onClick={handleAddQuiz}>추가</Button>
        </div>
      </div>
    </Modal>
  )
}
export default AddQuizModal
