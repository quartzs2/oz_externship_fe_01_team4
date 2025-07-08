export type Subject = {
  id: number
  name: string
}

export type MultipleChoiceQuestion = {
  id: number
  type: 'multiple_choice'
  question: string
  point: number
  prompt: string | null
  options: string[]
  answer: string
}

export type FillInBlankQuestion = {
  id: number
  type: 'fill_in_blank'
  question: string
  point: number
  prompt: string
  options: []
  answer: string
}

export type Question = MultipleChoiceQuestion | FillInBlankQuestion

export type QuizData = {
  id: number
  title: string
  subject: Subject
  question_count: number
  questions: Question[]
  created_at: string
  updated_at: string
}
