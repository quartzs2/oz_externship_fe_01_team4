import Button from '@components/common/Button'
import Modal from '@components/common/Modal'
import Sidebar from '@components/quizzes/add-quiz-modal/components/common/Sidebar'
import FillInTheBlanks from '@components/quizzes/add-quiz-modal/pages/FillInTheBlanks'
import MultipleChoice from '@components/quizzes/add-quiz-modal/pages/MultipleChoice'
import SortByOrder from '@components/quizzes/add-quiz-modal/pages/SortByOrder'
import SubjectiveShortAnswer from '@components/quizzes/add-quiz-modal/pages/SubjectiveShortAnswer'
import TrueOrFalse from '@components/quizzes/add-quiz-modal/pages/TrueOrFalse'
import { PADDING_SIZE } from '@constants/modal/modal'
import { type FormHandle } from '@custom-types/quizzes/quizFormTypes'
import type { Question } from '@custom-types/quizzes/quizTypes'
import {
  useRef,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
  useEffect,
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
  setQuizzes: Dispatch<SetStateAction<Question[]>>
  mode?: 'add' | 'edit'
  editQuestion?: Question
  onEditSuccess?: () => void
}

const AddQuizModal = ({
  isOpen,
  onClose,
  currentQuizCount,
  maxQuizCount,
  currentQuizScoreSum,
  maxQuizScoreSum,
  setQuizzes,
  mode = 'add',
  editQuestion,
  onEditSuccess,
}: AddQuizModalProps) => {
  const [currentTab, setCurrentTab] = useState(0)

  const pageRefs = useRef<(FormHandle | null)[]>([])

  // 수정 모드일 때 해당 문제 타입에 맞는 탭으로 설정
  useEffect(() => {
    if (mode === 'edit' && editQuestion) {
      const questionTypeToTabIndex: Record<string, number> = {
        multiple_choice: 0,
        true_false: 1,
        ordering: 2,
        short_answer: 3,
        fill_in_blank: 4,
      }
      const tabIndex = questionTypeToTabIndex[editQuestion.type] || 0
      setCurrentTab(tabIndex)
    }
  }, [mode, editQuestion])

  const validateFunction = ({
    QuizScore,
  }: ValidateFunctionProps): ValidateFunctionReturn => {
    // 수정 모드에서는 문제 개수 제한을 체크하지 않음
    if (mode === 'add' && currentQuizCount >= maxQuizCount) {
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

    // 수정 모드에서는 기존 문제의 점수를 제외하고 계산
    const currentScoreSum =
      mode === 'edit' && editQuestion
        ? currentQuizScoreSum - editQuestion.point
        : currentQuizScoreSum

    // 기존 문제 배점 합계와 현재 문제 점수를 더했을 때 최대점수를 초과하는 경우
    if (QuizScore + currentScoreSum > maxQuizScoreSum) {
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
          onClose={onClose}
          mode={mode}
          editQuestion={editQuestion}
          onEditSuccess={onEditSuccess}
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
          onClose={onClose}
          mode={mode}
          editQuestion={editQuestion}
          onEditSuccess={onEditSuccess}
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
          onClose={onClose}
          mode={mode}
          editQuestion={editQuestion}
          onEditSuccess={onEditSuccess}
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
          onClose={onClose}
          mode={mode}
          editQuestion={editQuestion}
          onEditSuccess={onEditSuccess}
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
          validateFunction={validateFunction}
          setQuizzes={setQuizzes}
          onClose={onClose}
          mode={mode}
          editQuestion={editQuestion}
          onEditSuccess={onEditSuccess}
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
          <Button onClick={handleAddQuiz}>
            {mode === 'edit' ? '수정' : '추가'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default AddQuizModal
