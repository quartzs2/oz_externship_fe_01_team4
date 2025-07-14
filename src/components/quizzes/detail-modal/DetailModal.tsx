import { useState, useEffect } from 'react'
import QuizzesWrapper from '@components/quizzes/detail-modal/components/QuizzesWrapper'
import { type Question, type QuizData } from '@custom-types/quizzes/quizTypes'
import AddQuizModal from '@components/quizzes/add-quiz-modal/AddQuizModal'
import Button from '@components/common/Button'
import { getQuizData, submitQuizData, deleteQuizData } from '@api/quizzes'
import AddExamModal from '@components/quizzes/add-exam-modal/AddExamModal'
import PopUp from '@components/common/PopUp'
import api from '@api/instance/axiosInstance'
import type { TableRowData } from '@custom-types/table'
import { ADMIN_API_PATH } from '@constants/urls'

type DetailModalProps = {
  testId: number
  onClose?: () => void
  fetchQuizzes: () => void
}

const MAX_QUIZ_COUNT = 10
const MAX_QUIZ_SCORE_SUM = 100

function DetailModal({ testId, onClose, fetchQuizzes }: DetailModalProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([])
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [subjects, setSubjects] = useState<TableRowData[]>([])
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const handleSubmit = async () => {
    await submitQuizData({
      test_id: testId,
      questions: visibleQuestions.map((question) => ({
        prompt: question.prompt || null,
        blank_count:
          question.type === 'fill_in_blank' ? question.options.length : null,
        options_json: question.options,
        answer: Array.isArray(question.answer)
          ? question.answer
          : [question.answer],
        question: question.question,
        type: question.type,
        point: question.point,
        explanation: question.explanation,
      })),
    })
  }

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getQuizData(testId)
        setQuizData(data)
        setVisibleQuestions(data.questions || [])
      } catch {
        setError('퀴즈 데이터를 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizData()
  }, [testId])

  // 과목 데이터 로딩
  useEffect(() => {
    if (isEditModalOpen && subjects.length === 0) {
      api
        .get(ADMIN_API_PATH.SUBJECTS)
        .then((res) => setSubjects(res.data.results))
    }
  }, [isEditModalOpen, subjects.length])

  const handleEditClick = () => {
    setIsEditModalOpen(true)
  }

  const handleEditSuccess = () => {
    fetchQuizzes()
    setIsEditModalOpen(false)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true)
      await deleteQuizData(testId)
      setIsDeleteModalOpen(false)
      // 삭제 성공 시 모달 닫기
      if (onClose) {
        onClose()
      }
    } catch (error) {
      // 'error' 객체의 message 속성을 활용하여 구체적인 에러 메시지를 설정합니다.
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      setError(`퀴즈 삭제에 실패했습니다: ${errorMessage}`) // <-- 'error.message' 사용 예시
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const handleQuestionEdit = (question: Question) => {
    setEditingQuestion(question)
    setIsAddQuizModalOpen(true)
  }

  const handleQuestionEditSuccess = () => {
    setEditingQuestion(null)
    setIsAddQuizModalOpen(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-[26px] p-[28px]">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  if (error || !quizData) {
    return (
      <div className="flex flex-col gap-[26px] p-[28px]">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[26px] p-[28px]">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold text-[#222222]">
          쪽지시험 상세조회
        </div>
        <div className="flex items-center justify-between gap-[6px]">
          <Button variant="VARIANT10" onClick={handleEditClick}>
            수정
          </Button>
          <Button variant="VARIANT4" onClick={handleDeleteClick}>
            삭제
          </Button>
        </div>
      </div>
      <QuizzesWrapper
        quizData={quizData}
        questions={visibleQuestions}
        setIsAddQuizModalOpen={setIsAddQuizModalOpen}
        setQuestions={setVisibleQuestions}
        handleSubmit={handleSubmit}
        onQuestionEdit={handleQuestionEdit}
      />
      <AddQuizModal
        isOpen={isAddQuizModalOpen}
        onClose={() => {
          setIsAddQuizModalOpen(false)
          setEditingQuestion(null)
        }}
        currentQuizCount={visibleQuestions.length}
        maxQuizCount={MAX_QUIZ_COUNT}
        currentQuizScoreSum={visibleQuestions.reduce(
          (sum, question) => sum + question.point,
          0
        )}
        maxQuizScoreSum={MAX_QUIZ_SCORE_SUM}
        setQuizzes={setVisibleQuestions}
        mode={editingQuestion ? 'edit' : 'add'}
        editQuestion={editingQuestion || undefined}
        onEditSuccess={handleQuestionEditSuccess}
      />

      {/* 수정 모달 */}
      {quizData && (
        <AddExamModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          subjects={subjects}
          fetchData={handleEditSuccess}
          mode="edit"
          editData={{
            testId: quizData.id,
            title: quizData.title,
            subjectId: quizData.subject.id,
            thumbnailUrl: quizData.thumbnail_img_url,
          }}
        />
      )}

      {/* 삭제 확인 모달 */}
      <PopUp
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        type="delete_confirm"
      >
        <PopUp.Title>해당 쪽지시험을 정말 삭제하시겠습니까?</PopUp.Title>
        <PopUp.Description>
          <div>쪽지시험 삭제 시 되돌릴 수 없으며,</div>
          <div>시험에 포함된 문제 내역까지 모두 삭제됩니다.</div>
        </PopUp.Description>
        <PopUp.Buttons>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            취소
          </Button>
          <Button onClick={handleDeleteConfirm} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </PopUp.Buttons>
      </PopUp>
    </div>
  )
}

export default DetailModal
