import Cookies from 'js-cookie'

// TypeScript에서 쿠키 이름을 상수로 관리하여 오타 방지
export const CookieKeys = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}

// 액세스 토큰 저장
export const setAccessToken = (token: string) => {
  localStorage.setItem(CookieKeys.ACCESS_TOKEN, token)
}

// 리프레시 토큰 저장
export const setRefreshToken = (token: string) => {
  const options = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict' as const,
  }
  Cookies.set(CookieKeys.REFRESH_TOKEN, token, options)
}

// 액세스 토큰 가져오기
export const getAccessToken = () => {
  return localStorage.getItem(CookieKeys.ACCESS_TOKEN)
}

// 리프레시 토큰 가져오기
export const getRefreshToken = () => {
  return Cookies.get(CookieKeys.REFRESH_TOKEN)
}

// 모든 토큰 삭제 (로그아웃 시 사용)
export const removeTokens = () => {
  localStorage.removeItem(CookieKeys.ACCESS_TOKEN)
  Cookies.remove(CookieKeys.REFRESH_TOKEN, { path: '/' })
}
