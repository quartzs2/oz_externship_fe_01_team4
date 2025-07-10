// 시간 포맷 함수
export const formatIsoToDotDateTime = (isoString: string, isTime: boolean) => {
  const [date, timePart] = isoString.split('T') // 날짜, 시간 분리
  const formattedDate = date.replace(/-/g, '.')
  const time = timePart?.split('.')[0] ?? '' // 소수점 이하 제거

  return isTime ? `${formattedDate} ${time}` : `${formattedDate}`
}
