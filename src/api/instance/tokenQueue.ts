import type { AxiosError } from 'axios'

// 실패한 요청을 임시 보관하는 타입
type FailedRequest = {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}

// 재시도 대기 중인 요청들을 저장
let failedQueue: FailedRequest[] = []

// 토큰 갱신 중 대기 중인 요청들을 저장 및 일괄 처리
export const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  // 토큰 갱신 성공 시 큐 요청 전부 재시도(resolve)
  // 아닐 시 실패처리 (reject)
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  // 큐 비우기
  failedQueue = []
}

export const addToQueue = (
  // 타입 추론(resolve 속성의 타입을 가져옴)
  resolve: FailedRequest['resolve'],
  reject: FailedRequest['reject']
) => {
  // 큐에 실패한 요청 추가
  failedQueue.push({ resolve, reject })
}
