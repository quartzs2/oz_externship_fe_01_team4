export type Generation = {
  id: number
  course_id: number
  course_name: string
  number: string
  registered_students: string
  max_student: number
  start_date: string
  end_date: string
  status: string
}

export type GenerationDetails = {
  id: number
  course: number
  course_id: number
  course_name: string
  course_tag: string
  course_description: string
  number: string
  registered_students: string
  max_student: number
  start_date: string
  end_date: string
  status: string
  created_at: string
  updated_at: string
}

export type GenerationsResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Generation[]
}
