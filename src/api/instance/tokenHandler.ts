import { refreshAccessToken } from '@api/auth/authAPI'
import { addToQueue, processQueue } from '@api/instance/tokenQueue'
import { getRefreshToken, removeTokens, setAccessToken } from '@utils/cookies'
import { navigateToLogin } from '@utils/navigation'
import { type AxiosError, type AxiosInstance } from 'axios'

let isRefreshing = false

// 401 에러 발생 시 토큰 갱신 및 재요청 처리
export const handleTokenRefreshQueue = async (
  axiosInstance: AxiosInstance,
  error: AxiosError
) => {
  const originalRequest = error.config
  if (!originalRequest) return Promise.reject(error)

  // 401 에러이고, 아직 토큰 갱신 중이 아닐 때
  if (error.response?.status === 401 && !isRefreshing) {
    isRefreshing = true
  }
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      addToQueue(resolve, reject)
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
    const { data } = await refreshAccessToken(refreshToken)
    const newAccessToken = data.access
    // const newRefreshToken = data.refresh

    // 새로 발급받은 토큰을 쿠키에 저장
    setAccessToken(newAccessToken)
    // setRefreshToken(newRefreshToken)

    // 실패했던 원래 요청의 헤더에 새 토큰을 설정
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
    }

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
