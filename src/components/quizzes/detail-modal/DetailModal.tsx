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
    thumbnail_img_url: 'https://cdn.ozschool.kr/thumbnails/test_4.png',
    question_count: 6,
    questions: [
      {
        id: 101,
        type: 'multiple_choice_single',
        question: '리눅스 명령어 중 파일 삭제는?',
        point: 5,
        prompt: null,
        options: ['rm', 'ls', 'mv', 'touch'],
        answer: 'rm',
        explanation: '파일을 삭제하는 명령어는 rm입니다.',
      },
      {
        id: 102,
        type: 'multiple_choice_multi',
        question: '파이썬의 콜렉션 자료형을 모두 고르세요',
        point: 5,
        prompt: null,
        options: ['list', 'dict', 'map', 'set'],
        answer: ['list', 'dict', 'set'],
        explanation: 'map은 내장 콜렉션이 아니고 함수입니다.',
      },
      {
        id: 103,
        type: 'ox',
        question: '파이썬은 인터프리터 언어이다.',
        point: 2,
        prompt: null,
        options: ['O', 'X'],
        answer: 'O',
        explanation: '파이썬은 컴파일이 아닌 인터프리트 방식입니다.',
      },
      {
        id: 104,
        type: 'ordering',
        question: '아래 보기들을 버블 정렬의 순서대로 나열하세요',
        point: 5,
        prompt: null,
        options: ['비교', '교환', '반복', '완료'],
        answer: ['비교', '교환', '반복', '완료'],
        explanation: '버블 정렬은 인접 요소를 비교하고 교환합니다.',
      },
      {
        id: 105,
        type: 'fill_in_blank',
        question: '자료구조에서 큐에 해당하는 구조를 입력하세요.',
        point: 5,
        prompt: '자료구조에서 큐는 (A)____ 구조입니다.',
        options: null,
        answer: ['FIFO'],
        explanation: '큐는 선입선출(FIFO) 구조입니다.',
      },
      {
        id: 106,
        type: 'short_answer',
        question: 'HTTP의 약어는 무엇인가요?',
        point: 5,
        prompt: '알파벳 4자로 입력하세요',
        options: null,
        answer: 'HyperText Transfer Protocol',
        explanation: 'HTTP는 웹 통신에 사용되는 프로토콜입니다.',
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
