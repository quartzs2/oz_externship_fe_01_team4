import type { TableRowData } from '@custom-types/table'

// 단일 항목
export type Submission = {
  id: number
  deployment: {
    test: {
      subject: {
        title: string
      }
      title: string
    }
    generation: {
      course: {
        name: string
      }
      number: number
    }
  }
  student: {
    user: {
      name: string
      nickname: string
    }
  }
  cheating_count: number
  score: number
  started_at: string
  created_at: string
}

// API 응답 타입
export type SubmissionResponse = {
  message: string
  data: Submission[]
}

export const mapSubmission = (data: Submission[]): TableRowData[] => {
  return data.map((item) => ({
    id: item.id,
    title: item.deployment.test.title,
    subject: item.deployment.test.subject.title,
    nickname: item.student.user.nickname,
    name: item.student.user.name,
    course: item.deployment.generation.course.name,
    generation: item.deployment.generation.number,
    cheating_count: item.cheating_count,
    score: item.score,
    started_at: item.started_at,
    created_at: item.created_at,
  }))
}
