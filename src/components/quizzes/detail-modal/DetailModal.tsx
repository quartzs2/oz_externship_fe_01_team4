import { useState, useEffect } from 'react'
import QuizzesWrapper from '@components/quizzes/detail-modal/components/QuizzesWrapper'
import { type Question, type QuizData } from '@custom-types/quizzes/quizTypes'
import AddQuizModal from '@components/quizzes/add-quiz-modal/AddQuizModal'
import Button from '@components/common/Button'
import { getQuizData, submitQuizData } from '@api/quizzes'

type DetailModalProps = {
  testId: number
}

const MAX_QUIZ_COUNT = 10
const MAX_QUIZ_SCORE_SUM = 100

function DetailModal({ testId }: DetailModalProps) {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([])
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false)

  const handleSubmit = async () => {
    try {
      await submitQuizData({
        test_id: testId,
        test_questions: visibleQuestions.map((question) => ({
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
    } catch (error) {
      console.error('Failed to submit quiz data:', error)
    }
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
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>
      <QuizzesWrapper
        quizData={quizData}
        questions={visibleQuestions}
        setIsAddQuizModalOpen={setIsAddQuizModalOpen}
        setQuestions={setVisibleQuestions}
        handleSubmit={handleSubmit}
      />
      <AddQuizModal
        isOpen={isAddQuizModalOpen}
        onClose={() => setIsAddQuizModalOpen(false)}
        currentQuizCount={visibleQuestions.length}
        maxQuizCount={MAX_QUIZ_COUNT}
        currentQuizScoreSum={visibleQuestions.reduce(
          (sum, question) => sum + question.point,
          0
        )}
        maxQuizScoreSum={MAX_QUIZ_SCORE_SUM}
        setQuizzes={setVisibleQuestions}
      />
    </div>
  )
}

export default DetailModal
