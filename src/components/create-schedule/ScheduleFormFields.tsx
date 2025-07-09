import Input from '@components/common/Input'
import Dropdown from '@components/common/Dropdown'
import Label from '@components/common/Label'

import { mapClassesToOptions, mapCoursesToOptions } from '@utils/scheduleUtils'
import { cn } from '@utils/cn'
import type {
  ScheduleFormData,
  ClassOption,
  UpdateFormFieldProps,
} from '@custom-types/createSchedule'

import {
  SCHEDULE_LABELS,
  SCHEDULE_PLACEHOLDERS,
  SCHEDULE_VALIDATION,
  SCHEDULE_STYLES,
  SCHEDULE_FORM_FIELDS,
} from '@constants/create-schedule'

type ScheduleFormFieldsProps = {
  formData: ScheduleFormData
  onFieldChange: (props: UpdateFormFieldProps) => void
  courses: ClassOption[]
  generations: ClassOption[]
}

export const ScheduleFormFields = ({
  formData,
  onFieldChange,
  courses,
  generations,
}: ScheduleFormFieldsProps) => {
  const courseOptions = mapCoursesToOptions(courses)
  const generationOptions = mapClassesToOptions(generations)

  const { ROW_CONTAINER, INPUT_WRAPPER_OFFSET, DURATION_UNIT_TEXT, SIZES } =
    SCHEDULE_FORM_FIELDS
  const { BORDER_FIRST, BORDER } = SCHEDULE_STYLES.FORM_ELEMENTS

  // 자동화된 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange({
      field: e.target.name as keyof ScheduleFormData,
      value: e.target.value,
    })
  }

  const handleDropdownChange =
    (name: keyof ScheduleFormData) => (option: { value: string }) => {
      onFieldChange({ field: name, value: option.value })
    }

  return (
    <div className="flex flex-col">
      {/* 과정 선택 */}
      <div className={cn(ROW_CONTAINER, BORDER_FIRST)}>
        <Label
          htmlFor="course-select"
          labelText={SCHEDULE_LABELS.FORM.COURSE_NAME}
          className={SIZES.LABEL}
        />
        <div className={INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="course-select"
            name="courseName"
            value={formData.courseName}
            onChange={handleDropdownChange('courseName')}
            options={courseOptions}
            placeholder={SCHEDULE_PLACEHOLDERS.COURSE_NAME}
            wrapClassName={SIZES.COURSE_DROPDOWN}
          />
        </div>
      </div>

      {/* 기수 선택 */}
      <div className={cn(ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="generation-select"
          labelText={SCHEDULE_LABELS.FORM.GENERATION_SELECT}
          className={SIZES.LABEL}
        />
        <div className={INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id="generation-select"
            name="generationId"
            value={formData.generationId}
            onChange={handleDropdownChange('generationId')}
            options={generationOptions}
            wrapClassName={SIZES.GENERATION_DROPDOWN}
          />
        </div>
      </div>

      {/* 시험 시간 */}
      <div className={cn(ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="duration-time-input"
          labelText={SCHEDULE_LABELS.FORM.DURATION_TIME}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id="duration-time-input"
            name="durationTime"
            type="number"
            min={SCHEDULE_VALIDATION.CONSTRAINTS.MIN_DURATION_TIME}
            value={formData.durationTime}
            onChange={handleInputChange}
            wrapClassName={SIZES.DURATION_INPUT}
          />
          <span className="whitespace-nowrap">{DURATION_UNIT_TEXT}</span>
        </div>
      </div>

      {/* 시험 시작 일시 */}
      <div className={cn(ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="start-date"
          labelText={SCHEDULE_LABELS.FORM.OPEN_AT}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id="start-date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.START_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id="start-time"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.START_TIME}
            wrapClassName={SIZES.TIME_INPUT}
          />
        </div>
      </div>

      {/* 시험 종료 일시 */}
      <div className={cn(ROW_CONTAINER, BORDER)}>
        <Label
          htmlFor="end-date"
          labelText={SCHEDULE_LABELS.FORM.CLOSE_AT}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id="end-date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.END_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id="end-time"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.END_TIME}
            wrapClassName={SIZES.TIME_INPUT}
          />
        </div>
      </div>
    </div>
  )
}
