// 엑세스 토큰 받아오는 로직
import {
  ADMIN_API_BASE_URL,
  ADMIN_API_PATH,
  API_BASE_URL,
} from '@constants/urls'
import axios, { type AxiosError } from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeTokens,
} from '@utils/cookies'
import { navigateToLogin } from '@utils/navigation'

// 1. 기본 Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// 2. 요청 인터셉터: 모든 요청에 액세스 토큰을 자동으로 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. 응답 인터셉터: 401 에러 발생 시 토큰 갱신 및 재요청 처리
let isRefreshing = false
let failedQueue: {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}[] = []

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 통과
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    // 401 에러이고, 아직 토큰 갱신 중이 아닐 때
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그인 페이지로 리디렉션 또는 에러 처리
          console.error('No refresh token available.')
          removeTokens() // 모든 토큰 삭제
          navigateToLogin() //  로그인 페이지로 이동
          return Promise.reject(error)
        }

        // 새 액세스 토큰 발급 요청
        const { data } = await axios.post(
          `${API_BASE_URL}${ADMIN_API_PATH.TOKEN_REFRESH}`,
          {
            refresh: refreshToken,
          }
        )

        const newAccessToken = data.access
        // const newRefreshToken = data.refresh

        // 새로 발급받은 토큰을 쿠키에 저장
        setAccessToken(newAccessToken)
        // setRefreshToken(newRefreshToken)

        // 실패했던 원래 요청의 헤더에 새 토큰을 설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // 대기 중이던 다른 요청들도 새 토큰으로 처리
        processQueue(null, newAccessToken)

        // 원래 요청을 다시 실행
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 시 (예: 리프레시 토큰도 만료)
        console.error('Token refresh failed:', refreshError)
        removeTokens() // 모든 토큰 삭제
        processQueue(refreshError as AxiosError, null)
        navigateToLogin() // 로그인 페이지로 이동
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // 토큰 갱신이 이미 진행 중일 때, 다른 요청들은 대기열에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return axiosInstance(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
