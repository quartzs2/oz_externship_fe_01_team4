import { useState } from 'react'
import { INITIAL_FORM_DATA, createSchedulePayload } from '@utils/scheduleUtils'
import { SCHEDULE_VALIDATION, SCHEDULE_API } from '@constants/create-schedule'
import type {
  ScheduleFormData,
  UseScheduleFormProps,
  UseScheduleFormReturn,
  FormValidationResult,
  SubmitResult,
  UpdateFormFieldProps,
} from '@custom-types/createSchedule'

const {
  MESSAGES: { REQUIRED_FIELDS, INVALID_DATE_RANGE, INVALID_DURATION },
  CONSTRAINTS: { MIN_DURATION_TIME },
} = SCHEDULE_VALIDATION

export const useScheduleForm = ({
  onSubmit,
  testId,
  courses,
  generations,
}: UseScheduleFormProps): UseScheduleFormReturn => {
  const [formData, setFormData] = useState<ScheduleFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA)
  }

  const updateFormField = ({ field, value }: UpdateFormFieldProps) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateScheduleForm = (
    formData: ScheduleFormData
  ): FormValidationResult => {
    const {
      courseName,
      generationId,
      durationTime,
      startDate,
      startTime,
      endDate,
      endTime,
    } = formData

    if (
      !courseName ||
      !generationId ||
      !durationTime ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      return {
        isValid: false,
        errorMessage: REQUIRED_FIELDS,
      }
    }

    const durationNum = Number(durationTime)
    if (durationNum < MIN_DURATION_TIME) {
      return {
        isValid: false,
        errorMessage: INVALID_DURATION,
      }
    }

    const startDateTime = new Date(`${startDate}T${startTime}`)
    const endDateTime = new Date(`${endDate}T${endTime}`)

    if (startDateTime >= endDateTime) {
      return {
        isValid: false,
        errorMessage: INVALID_DATE_RANGE,
      }
    }

    return { isValid: true }
  }

  const handleError = (error: unknown): SubmitResult => {
    const errorMessage = error instanceof Error ? error.message : ''
    let errorResponse = SCHEDULE_API.ERROR_MESSAGE

    switch (errorMessage) {
      case REQUIRED_FIELDS:
      case INVALID_DATE_RANGE:
      case INVALID_DURATION:
        errorResponse = errorMessage
        break
      default:
        errorResponse = SCHEDULE_API.ERROR_MESSAGE
    }

    return {
      success: false as const,
      error: errorResponse,
    }
  }

  const handleSubmit = async (): Promise<SubmitResult> => {
    setIsSubmitting(true)

    try {
      const validationResult = validateScheduleForm(formData)
      if (!validationResult.isValid) {
        throw new Error(validationResult.errorMessage)
      }

      const selectedCourse = courses.find(
        (course) => course.name === formData.courseName
      )
      if (!selectedCourse) {
        throw new Error(REQUIRED_FIELDS)
      }

      const selectedGeneration = generations.find(
        (generation) => Number(generation.id) === Number(formData.generationId)
      )
      if (!selectedGeneration) {
        throw new Error(REQUIRED_FIELDS)
      }

      const payload = createSchedulePayload(formData, testId)
      await onSubmit(payload)

      return { success: true as const }
    } catch (error: unknown) {
      return handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit,
  }
}
