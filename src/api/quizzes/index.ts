import axiosInstance from '@api/instance/axiosInstance'
import type {
  QuizData,
  SubmitQuizData,
  UpdateQuizData,
} from '@custom-types/quizzes/quizTypes'

export const getQuizData = async (testId: number): Promise<QuizData> => {
  const response = await axiosInstance.get(`tests/${testId}`)
  return response.data
}

export const submitQuizData = async (data: SubmitQuizData) => {
  const response = await axiosInstance.post(
    `tests-questions/bulk-update/`,
    data
  )
  return response.data
}

export const deleteQuizData = async (testId: number) => {
  const response = await axiosInstance.delete(`tests/${testId}/delete/`)
  return response.data
}

export const updateQuizData = async (testId: number, data: UpdateQuizData) => {
  const formData = new FormData()

  if (data.title) {
    formData.append('title', data.title)
  }
  if (data.subject_id) {
    formData.append('subject_id', String(data.subject_id))
  }
  if (data.thumbnail_file) {
    formData.append('thumbnail_file', data.thumbnail_file)
  }

  const response = await axiosInstance.patch(
    `tests/${testId}/update/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}
