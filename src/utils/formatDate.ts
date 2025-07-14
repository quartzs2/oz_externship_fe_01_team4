// 시간 포맷 함수
export const formatIsoToDotDateTime = (
  isoString: string,
  isTime: boolean,
  dateSeparator: '.' | '-' = '.'
) => {
  const [date, timePart] = isoString.split('T') // 날짜, 시간 분리
  const formattedDate = dateSeparator === '.' ? date.replace(/-/g, '.') : date
  const time = timePart?.split('.')[0] ?? '' // 소수점 이하 제거

  return isTime ? `${formattedDate} ${time}` : `${formattedDate}`
}

// 날짜 '년 월 일' 형식 포맷 함수
export const formatIsoToKoreanDate = (isoString: string) => {
  const date = new Date(isoString)
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1)
  const day = String(date.getDate())

  return `${year}년 ${month}월 ${day}일`
}
