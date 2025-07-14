import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import { useCustomToast } from '@hooks/toast/useToast'
import { ScheduleFormFields } from '@components/create-schedule/ScheduleFormFields'
import { useScheduleForm } from '@hooks/create-schedule/useScheduleForm'

import {
  SCHEDULE_LABELS,
  SCHEDULE_MODAL,
  SCHEDULE_STYLES,
  SCHEDULE_API,
} from '@constants/create-schedule'

import { TOAST_CONSTANTS } from '@constants/toast/toastConstants'
import type {
  ScheduleCreateModalProps,
  UpdateFormFieldProps,
} from '@custom-types/createSchedule'

const ScheduleModal = ({
  isOpen,
  onClose,
  testId,
  testTitle,
  subjectTitle,
  courses,
  generations,
  onSubmit,
}: ScheduleCreateModalProps) => {
  const toast = useCustomToast()

  const {
    formData,
    isSubmitting,
    updateFormField,
    resetForm,
    handleSubmit: handleFormSubmit,
  } = useScheduleForm({
    onSubmit,
    testId,
    courses,
    generations,
  })

  const handleFieldChange = (props: UpdateFormFieldProps) => {
    updateFormField(props)
  }

  const handleCreateButtonClick = async () => {
    const result = await handleFormSubmit()

    if (result.success) {
      toast.success(SCHEDULE_API.SUCCESS_MESSAGE, {
        style: TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER,
      })
      resetForm()
      onClose()
    } else {
      toast.error(result.error, {
        style: TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER,
      })
    }
    toast.error(SCHEDULE_API.ERROR_MESSAGE, {
      style: TOAST_CONSTANTS.STYLE.WHITE_LEFT_BORDER,
    })
  }

  return (
    <Modal
      modalId={SCHEDULE_MODAL.ID}
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      className={SCHEDULE_MODAL.WIDTH}
    >
      <div className={SCHEDULE_STYLES.MODAL.CONTAINER}>
        <h2 className={SCHEDULE_STYLES.MODAL.TITLE}>
          {SCHEDULE_LABELS.MODAL_TITLE}
        </h2>

        {/* 선택된 퀴즈 정보 표시 */}
        <div className={SCHEDULE_STYLES.QUIZ_INFO.CONTAINER}>
          <div className={SCHEDULE_STYLES.QUIZ_INFO.ITEM_CONTAINER}>
            <span className={SCHEDULE_STYLES.QUIZ_INFO.LABEL}>
              {SCHEDULE_LABELS.QUIZ_INFO.TEST_NAME}:
            </span>
            <span className={SCHEDULE_STYLES.QUIZ_INFO.VALUE}>{testTitle}</span>
          </div>
          <div className={SCHEDULE_STYLES.QUIZ_INFO.ITEM_CONTAINER}>
            <span className={SCHEDULE_STYLES.QUIZ_INFO.LABEL}>
              {SCHEDULE_LABELS.QUIZ_INFO.SUBJECT_NAME}:
            </span>
            <span className={SCHEDULE_STYLES.QUIZ_INFO.VALUE}>
              {subjectTitle}
            </span>
          </div>
        </div>

        <ScheduleFormFields
          formData={formData}
          onFieldChange={handleFieldChange}
          courses={courses}
          generations={generations}
        />

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleCreateButtonClick}
            variant="VARIANT1"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? SCHEDULE_LABELS.BUTTON.SUBMITTING
              : SCHEDULE_LABELS.BUTTON.SUBMIT}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleModal
