import axios, { type AxiosRequestConfig } from 'axios'
import type {
  DeploymentResponse,
  ErrorResponse,
  SchedulePayload,
} from '@custom-types/createSchedule'
import { SCHEDULE_CONSTANTS } from '@constants/create-schedule/createSchedule'
import { API_URLS } from '@constants/\burls'

// axios 인스턴스 생성 (baseURL 없이)
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(SCHEDULE_CONSTANTS.AUTH.TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
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
    throw new Error(SCHEDULE_CONSTANTS.API.ERROR_MESSAGE)
  }
}

// API 메서드에서 전체 URL 사용
export const quizAPI = {
  setDeploySchedule: (payload: SchedulePayload): Promise<DeploymentResponse> =>
    request<DeploymentResponse>(`${API_URLS.ADMIN}/test-deployments/`, {
      method: 'POST',
      data: {
        test_id: payload.test_id,
        generation_id: payload.generation_id,
        duration_time: payload.duration_time,
        open_at: payload.open_at,
        close_at: payload.close_at,
      },
    }),
} as const
