export type RawSubject = {
  id: number
  title: string
  number_of_days: number
  number_of_hours: number
  course_name: string
  status: boolean
  created_at: string
  updated_at: string
}

export type Subject = {
  id: number
  title: string
  days: number
  hours: number
  courseName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type SubjectResponse = {
  count: number
  next: string | null
  previous: string | null
  results: RawSubject[]
}

export const mapSubject = (raw: RawSubject): Subject => ({
  id: raw.id,
  title: raw.title,
  days: raw.number_of_days,
  hours: raw.number_of_hours,
  courseName: raw.course_name,
  isActive: raw.status,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
})
