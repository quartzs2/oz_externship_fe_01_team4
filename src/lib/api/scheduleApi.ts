import axios, { type AxiosRequestConfig } from 'axios'
import type {
  DeploymentResponse,
  ErrorResponse,
  SchedulePayload,
} from '@custom-types/createSchedule'
import { SCHEDULE_API } from '@constants/create-schedule'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// request 함수
const request = async <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      url,
      ...options,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data as ErrorResponse
      throw new Error(
        errorData.detail || errorData.message || `HTTP ${error.response.status}`
      )
    }
    throw new Error(SCHEDULE_API.ERROR_MESSAGE)
  }
}

// API 메서드 - snake_case 변환
export const quizAPI = {
  setDeploySchedule: (payload: SchedulePayload): Promise<DeploymentResponse> =>
    request<DeploymentResponse>(ADMIN_API_PATH.TEST_DEPLOYMENTS, {
      method: 'POST',
      data: {
        test_id: payload.testId,
        generation_id: payload.generationId,
        duration_time: payload.durationTime,
        open_at: payload.openAt,
        close_at: payload.closeAt,
      },
    }),
} as const
