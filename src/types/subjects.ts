export type Subject = {
  id: number
  title: string
  number_of_days: number
  number_of_hours: number
  course_name: string
  status: boolean
  created_at: string
  updated_at: string
  thumbnail_img_url: string
}

export type SubjectResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Subject[]
}
