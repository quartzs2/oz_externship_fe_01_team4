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
          // Lockout period has passed, reset attempts
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

        console.log('Login successful')
        // 로그인 성공 시 실패 횟수 및 잠금 시간 초기화
        localStorage.removeItem(FAILED_ATTEMPTS_KEY)
        localStorage.removeItem(LOCKOUT_END_TIME_KEY)

        return true
      } catch (error) {
        console.error('Login failed:', error)
        removeTokens() //  잔여 토큰 제거
        setIsLoggedIn(false)

        // --- Modified part ---
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
                const lockoutEndTime = Date.now() + LOCKOUT_DURATION_MS
                localStorage.setItem(
                  LOCKOUT_END_TIME_KEY,
                  lockoutEndTime.toString()
                )
                throw new Error('LOGIN_LOCKED_OUT')
              }
              throw new Error('INVALID_CREDENTIALS') // Specific error for wrong email/password
            } else if (error.response.status === 429) {
              throw new Error('TOO_MANY_ATTEMPTS') // Specific error for rate limiting
            }
          }
        }
        throw new Error('UNKNOWN_LOGIN_ERROR') // Generic error for other issues
        // --- End of modified part ---
      }
    },
    []
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
