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

  // 필드 ID/Name 상수
  const FIELD_NAMES = {
    COURSE_NAME: 'courseName',
    GENERATION_ID: 'generationId',
    DURATION_TIME: 'durationTime',
    START_DATE: 'startDate',
    START_TIME: 'startTime',
    END_DATE: 'endDate',
    END_TIME: 'endTime',
  } as const

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
          htmlFor={FIELD_NAMES.COURSE_NAME}
          labelText={SCHEDULE_LABELS.FORM.COURSE_NAME}
          className={SIZES.LABEL}
        />
        <div className={INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id={FIELD_NAMES.COURSE_NAME}
            name={FIELD_NAMES.COURSE_NAME}
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
          htmlFor={FIELD_NAMES.GENERATION_ID}
          labelText={SCHEDULE_LABELS.FORM.GENERATION_SELECT}
          className={SIZES.LABEL}
        />
        <div className={INPUT_WRAPPER_OFFSET}>
          <Dropdown
            id={FIELD_NAMES.GENERATION_ID}
            name={FIELD_NAMES.GENERATION_ID}
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
          htmlFor={FIELD_NAMES.DURATION_TIME}
          labelText={SCHEDULE_LABELS.FORM.DURATION_TIME}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id={FIELD_NAMES.DURATION_TIME}
            name={FIELD_NAMES.DURATION_TIME}
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
          htmlFor={FIELD_NAMES.START_DATE}
          labelText={SCHEDULE_LABELS.FORM.OPEN_AT}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id={FIELD_NAMES.START_DATE}
            name={FIELD_NAMES.START_DATE}
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.START_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id={FIELD_NAMES.START_TIME}
            name={FIELD_NAMES.START_TIME}
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
          htmlFor={FIELD_NAMES.END_DATE}
          labelText={SCHEDULE_LABELS.FORM.CLOSE_AT}
          className={SIZES.LABEL}
        />
        <div className={cn('flex items-center gap-2', INPUT_WRAPPER_OFFSET)}>
          <Input
            id={FIELD_NAMES.END_DATE}
            name={FIELD_NAMES.END_DATE}
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            aria-label={SCHEDULE_LABELS.ARIA.END_DATE}
            wrapClassName={SIZES.DATE_INPUT}
          />
          <Input
            id={FIELD_NAMES.END_TIME}
            name={FIELD_NAMES.END_TIME}
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
