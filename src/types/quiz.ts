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
 * [순서 정렬형] 문제의 보기 하나에 대한 타입입니다.
 */
export type OrderFormOption = {
  text: string
  order: string
}

/**
 * [빈칸 채우기형] 문제의 보기 하나에 대한 타입입니다.
 */
export type BlankFormOption = {
  text: string
  order: string // A, B, ..
}

/**
 * [다지선다형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type MultipleChoiceFormValues = {
  type: 'multiple-choice'
  question: string
  options: QuizOption[]
  score: string
  solution: string
}

/**
 * [주관식 단답형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type SubjectiveShortAnswerFormValues = {
  type: 'subjective-short-answer'
  question: string
  answer: string // 답안
  score: string
  solution: string // 해설
}

/**
 * [빈칸 채우기형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type FillInTheBlanksFormValues = {
  type: 'fill-in-the-blanks'
  question: string
  passage: string // 지문
  options: BlankFormOption[]
  score: string
  solution: string
}

/**
 * [순서 정렬형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type SortByOrderFormValues = {
  type: 'sort-by-order'
  question: string
  options: OrderFormOption[]
  score: string
  solution: string
}

/**
 * [참/거짓형] 페이지의 폼 전체 데이터 구조입니다.
 */
export type TrueOrFalseFormValues = {
  type: 'true-or-false'
  question: string
  options: QuizOption[] // O, X 두 가지 옵션
  score: string
  solution: string
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
