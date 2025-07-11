import { handleTokenRefreshQueue } from '@api/instance/tokenHandler'
import { getAccessToken } from '@utils/cookies'
import { navigateToLogin } from '@utils/navigation'
import type { AxiosError, AxiosInstance } from 'axios'

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken()
      if (!accessToken) {
        navigateToLogin()
        return Promise.reject(new Error('액세스 토큰이 없음'))
      }
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      return handleTokenRefreshQueue(instance, error)
    }
  )
}
