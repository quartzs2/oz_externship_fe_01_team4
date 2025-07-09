import type {
  ScheduleFormData,
  SchedulePayload,
  DropdownOption,
  ClassOption,
} from '@custom-types/createSchedule'

export const INITIAL_FORM_DATA: ScheduleFormData = {
  courseName: '',
  generationId: '',
  durationTime: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
}

/**
 * 폼 데이터를 API 페이로드로 변환
 */
export const createSchedulePayload = (
  formData: ScheduleFormData,
  testId: number
): SchedulePayload => {
  const { generationId, durationTime, startDate, startTime, endDate, endTime } =
    formData

  return {
    testId: testId,
    generationId: Number(generationId),
    durationTime: Number(durationTime),
    openAt: `${startDate}T${startTime}`,
    closeAt: `${endDate}T${endTime}`,
  }
}

/**
 * 기수 목록을 드롭다운 옵션으로 변환
 */
export const mapClassesToOptions = (
  classes: ClassOption[]
): DropdownOption[] => {
  return classes.map((cls) => ({
    label: cls.name,
    value: String(cls.id),
  }))
}

/**
 * 과정 목록을 드롭다운 옵션으로 변환 (courseName 선택용)
 */
export const mapCoursesToOptions = (
  courses: ClassOption[]
): DropdownOption[] => {
  return courses.map((course) => ({
    label: course.name,
    value: course.name, // courseName은 문자열 값으로 저장
  }))
}
