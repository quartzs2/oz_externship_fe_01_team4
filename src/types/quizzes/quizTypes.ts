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
  options: null
  answer: string
  explanation: string
}

export type FillInBlankQuestion = {
  id: number
  type: 'fill_in_blank'
  question: string
  point: number
  prompt: string
  options: null
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
