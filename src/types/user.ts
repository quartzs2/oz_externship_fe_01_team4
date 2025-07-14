// types

export type User = {
  name?: string
  profileUrl?: string
}

/**
 * 로그인 시 서버에 보낼 자격 증명 정보
 */
export interface UserCredentials {
  email: string
  password: string
}

/**
 * 인증 훅 (useAuth)의 상태와 함수들을 정의하는 타입
 */
export interface AuthState {
  isLoggedIn: boolean // 현재 로그인 되어 있는지 여부
  login: (credentials: UserCredentials) => Promise<boolean> // 로그인 함수, 성공 시 true 반환
  logout: () => void // 로그아웃 함수
}
