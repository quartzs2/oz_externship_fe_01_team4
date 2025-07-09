import { useState } from 'react'
import QuizzesWrapper from '@components/quizzes/detail-modal/components/QuizzesWrapper'
import { type Question, type QuizData } from '@custom-types/quizzes/quizTypes'

function DetailModal() {
  // TODO: 임시 데이터, 나중에 수정
  const quizData: QuizData = {
    id: 4,
    title: '자료구조 쪽지시험',
    subject: {
      id: 1,
      name: '컴퓨터공학',
    },
    question_count: 2,
    questions: [
      {
        id: 101,
        type: 'multiple_choice_single',
        question: '스택의 LIFO는 무엇의 약자인가요?',
        point: 5,
        prompt: null,
        options: ['Last In', 'First Out'],
        answer: 'Last In First Out',
        explanation: '',
      },
      {
        id: 102,
        type: 'fill_in_blank',
        question: '다음 문장을 완성하세요',
        point: 5,
        prompt: '자료구조에서 큐는 ____ 구조입니다.',
        options: [],
        answer: 'FIFO',
        explanation: '',
      },
    ],
    created_at: '2025-06-01T14:23:00',
    updated_at: '2025-06-19T17:45:00',
  }
  const [additionalQuestions, setAdditionalQuestions] = useState<Question[]>([])
  const visibleQuestions = [...quizData.questions, ...additionalQuestions]

  return (
    <div className="flex flex-col gap-[26px] p-[28px]">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold text-[#222222]">
          쪽지시험 상세조회
        </div>
        <div className="flex items-center justify-between gap-[6px]">
          {/* TODO: 버튼 영역 */}
        </div>
      </div>
      <QuizzesWrapper quizData={quizData} questions={visibleQuestions} />
    </div>
  )
}

export default DetailModal
