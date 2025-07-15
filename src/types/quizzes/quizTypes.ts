export type Subject = {
  id: number
  name: string
}

export type MultipleChoiceSingleQuestion = {
  id: number
  type: 'multiple_choice_single'
  question: string
  point: number
  prompt: null
  options: string[]
  answer: string
  explanation: string
}

export type MultipleChoiceMultiQuestion = {
  id: number
  type: 'multiple_choice_multi'
  question: string
  point: number
  prompt: null
  options: string[]
  answer: string[]
  explanation: string
}

export type OxQuestion = {
  id: number
  type: 'ox'
  question: string
  point: number
  prompt: string | null
  options: string[]
  answer: string
  explanation: string
}
export type OrderingQuestion = {
  id: number
  type: 'ordering'
  question: string
  point: number
  prompt: null
  options: string[]
  answer: string[]
  explanation: string
}

export type ShortAnswerQuestion = {
  id: number
  type: 'short_answer'
  question: string
  point: number
  prompt: string
  options: []
  answer: string
  explanation: string
}

export type FillInBlankQuestion = {
  id: number
  type: 'fill_in_blank'
  question: string
  point: number
  prompt: string
  options: []
  answer: string[]
  explanation: string
}

export type Question =
  | MultipleChoiceSingleQuestion
  | MultipleChoiceMultiQuestion
  | FillInBlankQuestion
  | ShortAnswerQuestion
  | OrderingQuestion
  | OxQuestion

export type QuestionType = Question['type']

export type QuizData = {
  id: number
  title: string
  subject: Subject
  thumbnail_img_url: string
  question_count: number
  questions: Question[]
  created_at: string
  updated_at: string
}

// 제출용 문제 타입
export type SubmitQuestion = {
  prompt: string | null
  blank_count: number | null
  options_json: string[]
  answer: string[]
  question: string
  type: string
  point: number
  explanation: string
}

// 제출용 퀴즈 데이터 타입
export type SubmitQuizData = {
  test_id: number
  questions: SubmitQuestion[]
}

export type UpdateQuizData = {
  title?: string
  subject_id?: number
  thumbnail_file?: File
}
