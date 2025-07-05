/**
 * 부모 컴포넌트(AddQuizModal)가 자식 페이지 컴포넌트의
 * 함수를 호출하기 위해 사용하는 ref의 타입입니다.
 */
export type FormHandle = {
  submit: () => void
}

/**
 * [다지선다형] 문제의 보기 하나에 대한 타입입니다.
 */
export type QuizOption = {
  text: string
  isCorrect: boolean
}

/**
 * [다지선다형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type MultipleChoiceFormValues = {
  type: 'multiple-choice'
  question: string
  options: QuizOption[]
  score: string
  solution: string // Tiptap 에디터 콘텐츠
}

/**
 * [주관식 단답형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type SubjectiveShortAnswerFormValues = {
  type: 'subjective-short-answer'
  question: string
  answer: string // 주관식 답안
  score: string
  solution: string // Tiptap 에디터 콘텐츠
}

/**
 * [빈칸 채우기형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type FillInTheBlanksFormValues = {
  type: 'fill-in-the-blanks'
  question: string
  passage: string // 지문
  options: QuizOption[] // 빈칸 답안 보기
  score: string
  solution: string // Tiptap 에디터 콘텐츠
}

/**
 * [순서 정렬형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type SortByOrderFormValues = {
  type: 'sort-by-order'
  question: string
  options: QuizOption[] // 순서 정렬 보기
  score: string
  solution: string // Tiptap 에디터 콘텐츠
}

/**
 * [참/거짓형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type TrueOrFalseFormValues = {
  type: 'true-or-false'
  question: string
  options: QuizOption[] // O, X 두 가지 옵션
  score: string
  solution: string // Tiptap 에디터 콘텐츠
}

/**
 * 모든 퀴즈 타입을 통합하는 유니온 타입입니다.
 */
export type QuizFormTypes =
  | MultipleChoiceFormValues
  | SubjectiveShortAnswerFormValues
  | FillInTheBlanksFormValues
  | SortByOrderFormValues
  | TrueOrFalseFormValues
