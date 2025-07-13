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
  const response = await axiosInstance.post(`test-questions`, data)
  return response.data
}

export const deleteQuizData = async (testId: number) => {
  const response = await axiosInstance.delete(`tests/${testId}/delete`)
  return response.data
}

export const updateQuizData = async (testId: number, data: UpdateQuizData) => {
  const response = await axiosInstance.patch(`tests/${testId}`, data)
  return response.data
}
