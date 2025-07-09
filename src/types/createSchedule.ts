export type DeploymentResponse = {
  deploymentId: number
  accessCode: string
  status: string
}

export type ErrorResponse = {
  detail: string
  message?: string
}

export type QuizData = {
  id: number
  title: string
  subjectName: string
}

// 배포 일정 생성에 필요한 정보
export type SchedulePayload = {
  testId: number
  generationId: number
  durationTime: number
  openAt: string
  closeAt: string
}

// 폼 데이터
export type ScheduleFormData = {
  courseName: string
  generationId: string
  durationTime: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

// 드롭다운용 옵션
export type ClassOption = {
  id: number
  name: string
}

export type DropdownOption = {
  label: string
  value: string
}

// 모달 Props
export type ScheduleCreateModalProps = {
  isOpen: boolean
  onClose: () => void
  testId: number
  testTitle: string
  subjectTitle: string
  courses: ClassOption[]
  generations: ClassOption[]
  onSubmit: (payload: SchedulePayload) => Promise<void>
}

// 유효성 검증 결과
export type FormValidationResult = {
  isValid: boolean
  errorMessage?: string
}

// 폼 훅 Props
export type UseScheduleFormProps = {
  onSubmit: (payload: SchedulePayload) => Promise<void>
  testId: number
  courses: ClassOption[]
  generations: ClassOption[]
}

export type UpdateFormFieldProps = {
  field: keyof ScheduleFormData
  value: string
}

export type SubmitResult = { success: true } | { success: false; error: string }

export type UseScheduleFormReturn = {
  formData: ScheduleFormData
  isSubmitting: boolean
  updateFormField: (props: UpdateFormFieldProps) => void
  handleSubmit: () => Promise<SubmitResult>
  resetForm: () => void
}
