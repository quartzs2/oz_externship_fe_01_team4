/**
 * 중첩된 에러 객체 내에서 message라는 키를 가진 첫 번째 문자열 값을 반환
 *
 * - react-hook-form의 onError에서 사용합니다.
 * @param error 검색 대상이 되는 에러
 * @returns 찾은 첫 번째 에러 메시지 문자열을 반환, 찾지 못하면 undefined 반환
 */
const findFirstErrorMessage = (error: unknown): string | undefined => {
  if (typeof error !== 'object' || !error) {
    return undefined
  }

  const potentialError = error as Record<string, unknown>

  if (typeof potentialError.message === 'string') {
    return potentialError.message
  }

  const nestedErrors = Object.values(potentialError)
  for (const nestedError of nestedErrors) {
    const message = findFirstErrorMessage(nestedError)
    if (message) {
      return message
    }
  }

  return undefined
}

export default findFirstErrorMessage
