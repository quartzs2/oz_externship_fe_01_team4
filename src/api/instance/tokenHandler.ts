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

  // 요청 설정이 없으면 에러 반환
  if (!originalRequest) {
    return Promise.reject(error)
  }

  // ⭐️ 핵심 수정: 401 Unauthorized 에러가 아니면 즉시 에러를 던져서 원래 요청의 catch 블록으로 넘어가게 합니다.
  // 400 Bad Request는 이 조건에 해당되어 바로 반환될 것입니다.
  if (error.response?.status !== 401) {
    console.warn(
      `Non-401 error (${error.response?.status}) received. Rejecting without token refresh.`
    )
    return Promise.reject(error)
  }

  // 이제부터는 401 에러인 경우에만 실행됩니다.

  // 토큰 갱신이 이미 진행 중인 경우, 요청을 큐에 추가
  if (isRefreshing) {
    console.log(
      'Token refresh is already in progress. Adding request to queue.'
    )
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

  // 토큰 갱신 시작
  isRefreshing = true
  console.log('Starting token refresh process...')

  try {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      console.error('No refresh token available. Logging out.')
      removeTokens() // 모든 토큰 삭제
      navigateToLogin() // 로그인 페이지로 이동
      // 🚨 중요: 여기서 reject를 해야 상위 catch에서 에러를 처리할 수 있습니다.
      return Promise.reject(new Error('Refresh token not found.'))
    }

    // 새 액세스 토큰 발급 요청
    const { data } = await refreshAccessToken(refreshToken)
    const newAccessToken = data.access
    // const newRefreshToken = data.refresh // 필요하다면 이 부분도 처리

    // 새로 발급받은 토큰을 쿠키에 저장
    setAccessToken(newAccessToken)
    // setRefreshToken(newRefreshToken) // 필요하다면 이 부분도 처리

    // 실패했던 원래 요청의 헤더에 새 토큰을 설정
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
    }

    // 대기 중이던 다른 요청들도 새 토큰으로 처리
    processQueue(null, newAccessToken)

    // 원래 요청을 다시 실행
    console.log('Token refreshed. Retrying original request.')
    return axiosInstance(originalRequest)
  } catch (refreshError) {
    // 리프레시 토큰 갱신 실패 시 (예: 리프레시 토큰도 만료)
    console.error('Token refresh failed:', refreshError)
    removeTokens() // 모든 토큰 삭제
    processQueue(refreshError as AxiosError, null)
    navigateToLogin() // 로그인 페이지로 이동
    return Promise.reject(refreshError)
  } finally {
    isRefreshing = false // 갱신 상태 해제
    console.log('Token refresh process finished.')
  }
}
