export const SCHEDULE_VALIDATION = {
  MESSAGES: {
    REQUIRED_FIELDS: '모든 항목을 입력해주세요.',
    INVALID_DATE_RANGE: '시작 일시가 종료 일시보다 늦을 수 없습니다.',
    INVALID_DURATION: '진행 시간은 1분 이상이어야 합니다.',
  },
  CONSTRAINTS: {
    MIN_DURATION_TIME: 1,
    MAX_COURSE_NAME: 20,
  },
}
