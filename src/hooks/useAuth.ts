import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ADMIN_API_PATH, API_BASE_URL } from '@constants/urls'
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  removeTokens,
} from '@utils/cookies'
import type { UserCredentials, AuthState } from '@custom-types/user'

export const useAuth = (): AuthState => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(getAccessToken())
  )

  const MAX_FAILED_ATTEMPTS = 5
  // const LOCKOUT_DURATION_MS = 10 * 60 * 1000 //10분 차단
  const LOCKOUT_DURATION_MS = 5 * 1000
  const FAILED_ATTEMPTS_KEY = 'failedLoginAttempts'
  const LOCKOUT_END_TIME_KEY = 'loginLockoutEndTime'

  const login = useCallback(
    async (credentials: UserCredentials): Promise<boolean> => {
      const storedLockoutEndTime = localStorage.getItem(LOCKOUT_END_TIME_KEY)
      if (storedLockoutEndTime) {
        const lockoutEndTime = parseInt(storedLockoutEndTime, 10)
        if (Date.now() < lockoutEndTime) {
          throw new Error('LOGIN_LOCKED_OUT')
        } else {
          localStorage.removeItem(FAILED_ATTEMPTS_KEY)
          localStorage.removeItem(LOCKOUT_END_TIME_KEY)
        }
      }
      try {
        const response = await axios.post(
          `${API_BASE_URL}${ADMIN_API_PATH.LOGIN_EMAIL}`,
          credentials
        )
        const { access, refresh } = response.data

        setAccessToken(access)
        setRefreshToken(refresh)
        setIsLoggedIn(true)

        localStorage.removeItem(FAILED_ATTEMPTS_KEY)
        localStorage.removeItem(LOCKOUT_END_TIME_KEY)

        return true
      } catch (error) {
        removeTokens()
        setIsLoggedIn(false)

        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (
              error.response.status === 401 ||
              error.response.status === 400
            ) {
              let attempts = parseInt(
                localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0',
                10
              )
              attempts++
              localStorage.setItem(FAILED_ATTEMPTS_KEY, attempts.toString())

              if (attempts >= MAX_FAILED_ATTEMPTS) {
                const lockoutEndTime = Date.now() + LOCKOUT_DURATION_MS // <-- 여기서 사용됨
                localStorage.setItem(
                  LOCKOUT_END_TIME_KEY,
                  lockoutEndTime.toString()
                )
                throw new Error('LOGIN_LOCKED_OUT')
              }
              throw new Error('INVALID_CREDENTIALS')
            } else if (error.response.status === 429) {
              throw new Error('TOO_MANY_ATTEMPTS')
            }
          }
        }
        throw new Error('UNKNOWN_LOGIN_ERROR')
      }
    },
    [
      LOCKOUT_DURATION_MS, // 이 값을 포함합니다.
      MAX_FAILED_ATTEMPTS, // 이 값도 포함합니다.
    ]
  )

  const logout = useCallback(() => {
    removeTokens()
    setIsLoggedIn(false)
    // 필요시 로그인 페이지로 리디렉션
    // window.location.href = '/login'
  }, [])

  // 앱 로드 시 쿠키의 토큰 유무로 로그인 상태 초기화
  useEffect(() => {
    const token = getAccessToken()
    setIsLoggedIn(!!token)
  }, [])

  return { isLoggedIn, login, logout }
}
