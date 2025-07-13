import Button from '@components/common/Button'
import Dropdown from '@components/common/Dropdown'
import FormRow from '@components/common/FormRow'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import { ADMIN_API_PATH } from '@constants/urls'
import { useCustomToast } from '@hooks/toast/useToast'
import api from '@api/instance/axiosInstance'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCourses } from '@hooks/queries/useCourses'

interface AddGenerationModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddGenerationModal = ({ isOpen, setIsOpen }: AddGenerationModalProps) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('') // course
  const [generationNumber, setGenerationNumber] = useState<string>('') // number
  const [maxStudent, setMaxStudent] = useState<string>('') // max_student
  const [startDate, setStartDate] = useState<string>('') // start_date (string으로 관리)
  const [endDate, setEndDate] = useState<string>('') // end_date (string으로 관리)
  const [status, setStatus] = useState<string>('') // status

  const [errors, setErrors] = useState({
    course: false,
    generationNumber: false,
    maxStudent: false,
    startDate: false,
    endDate: false,
    status: false,
    generationNumberRange: '', // 문자열로 에러 메시지를 직접 저장
    maxStudentRange: '', // 문자열로 에러 메시지를 직접 저장
    dateOrder: false,
  })

  const { data: courseOptionsData } = useCourses()

  const courseOptions =
    courseOptionsData?.map((course) => ({
      label: String(course.name ?? ''),
      value: String(course.id),
    })) ?? []

  const statusOptions = [
    { label: '준비중', value: 'Ready' },
    { label: '진행중', value: 'Ongoing' },
    { label: '종료', value: 'Finished' },
  ]

  const toast = useCustomToast()
  const queryClient = useQueryClient()

  const validateForm = () => {
    const newErrors = {
      course: !selectedCourseId,
      generationNumber: false, // 초기화
      maxStudent: false, // 초기화
      startDate: !startDate,
      endDate: !endDate,
      status: !status,
      generationNumberRange: '', // 초기화
      maxStudentRange: '', // 초기화
      dateOrder: false, // 초기화
    }

    const genNum = Number(generationNumber.trim())
    const maxStd = Number(maxStudent.trim())

    // 기수 (generationNumber) 유효성 검사
    if (!generationNumber.trim() || isNaN(genNum) || genNum <= 0) {
      newErrors.generationNumber = true
    } else if (genNum > 30000) {
      // 30000 초과 시 에러
      newErrors.generationNumberRange = '30000 이하로 입력해주세요.'
    }

    // 최대 수강생 수 (maxStudent) 유효성 검사
    if (!maxStudent.trim() || isNaN(maxStd) || maxStd <= 0) {
      newErrors.maxStudent = true
    } else if (maxStd > 60) {
      // 60 초과 시 에러
      newErrors.maxStudentRange = '60 이하로 입력해주세요.'
    }

    // 날짜 순서 유효성 검사 (이전 대화에서 중요하다고 확인된 부분)
    if (startDate && endDate) {
      const startDateTime = new Date(startDate)
      const endDateTime = new Date(endDate)

      // 시간 정보까지 포함했더라도, 날짜만 비교하는 로직이라면
      // 2025-07-10 00:00:00 vs 2025-07-09 23:59:59 의 경우 start가 end보다 나중이므로 에러.
      // Date 객체 비교는 시간까지 고려하므로 정확합니다.
      if (startDateTime.getTime() >= endDateTime.getTime()) {
        newErrors.endDate = true // 종료일 필드 자체에 에러 표시
        newErrors.dateOrder = true // 날짜 순서 에러 별도 플래그
      }
    }

    setErrors(newErrors)
    // 모든 에러가 false (또는 빈 문자열)여야 true 반환
    return !Object.values(newErrors).some((errorValue) =>
      typeof errorValue === 'boolean' ? errorValue : errorValue !== ''
    )
  }

  const postGeneration = async () => {
    const postData = {
      course_id: Number(selectedCourseId), // 필드명 수정된 상태 유지
      number: Number(generationNumber),
      max_student: Number(maxStudent),
      start_date: startDate,
      end_date: endDate,
      status: status,
    }

    try {
      const response = await api.post(ADMIN_API_PATH.GENERATIONS, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (err) {
      console.error('기수 등록 실패:', err)
      throw err
    }
  }

  const resetForm = () => {
    setSelectedCourseId('')
    setGenerationNumber('')
    setMaxStudent('')
    setStartDate('')
    setEndDate('')
    setStatus('')
    setErrors({
      course: false,
      generationNumber: false,
      maxStudent: false,
      startDate: false,
      endDate: false,
      status: false,
      generationNumberRange: '',
      maxStudentRange: '',
      dateOrder: false,
    })
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await postGeneration()
      queryClient.invalidateQueries({ queryKey: ['Generations'] })
      setIsOpen(false)
      resetForm()
      toast.success('성공적으로 기수가 등록되었습니다.', {
        style: 'style4',
        duration: 5000,
        hasActionButton: false,
        actionLabel: '확인',
        hasCloseButton: true,
        hasIcon: true,
      })
    } catch (error) {
      console.error('handleSubmit 에러:', error)
      toast.error('기수 등록에 실패했습니다. 관리자에게 문의하세요.')
    }
  }

  return (
    <Modal
      modalId="add-generation-modal"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        resetForm()
      }}
      paddingSize={32}
      isBackgroundDimmed
      closeButtonOffset={16}
    >
      <h1 className="mb-[53px] text-xl font-bold">신규 기수 등록</h1>

      <div className="flex flex-col">
        {/* 과정 선택 드롭다운 */}
        <FormRow
          htmlFor="courseSelect"
          labelText="과정 선택"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Dropdown
              id="courseSelect"
              name="courseSelect"
              value={selectedCourseId}
              onChange={(selectedOption) => {
                setSelectedCourseId(selectedOption.value)
                setErrors({ ...errors, course: false })
              }}
              options={courseOptions}
              placeholder="과정을 선택해주세요."
            />
            {errors.course && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과정 선택 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 기수 */}
        <FormRow
          htmlFor="generationNumber"
          labelText="기수"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="generationNumber"
              name="generationNumber"
              type="number"
              value={generationNumber}
              placeholder="기수 번호를 입력해주세요."
              onChange={(e) => {
                setGenerationNumber(e.target.value)
                // 입력 시 에러 메시지 초기화
                setErrors({
                  ...errors,
                  generationNumber: false,
                  generationNumberRange: '',
                })
              }}
            />
            {errors.generationNumber && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                유효한 기수 번호 입력 필수
              </p>
            )}
            {errors.generationNumberRange && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                {errors.generationNumberRange}
              </p>
            )}
          </div>
        </FormRow>

        {/* 최대 수강생 수 */}
        <FormRow
          htmlFor="maxStudent"
          labelText="최대 수강생 수"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="maxStudent"
              name="maxStudent"
              type="number"
              value={maxStudent}
              placeholder="최대 수강생 수를 입력해주세요."
              onChange={(e) => {
                setMaxStudent(e.target.value)
                // 입력 시 에러 메시지 초기화
                setErrors({
                  ...errors,
                  maxStudent: false,
                  maxStudentRange: '',
                })
              }}
            />
            {errors.maxStudent && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                유효한 최대 수강생 수 입력 필수
              </p>
            )}
            {errors.maxStudentRange && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                {errors.maxStudentRange}
              </p>
            )}
          </div>
        </FormRow>

        {/* 시작일 (HTML date Input) */}
        <FormRow
          htmlFor="startDate"
          labelText="시작일"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value)
                setErrors({ ...errors, startDate: false, dateOrder: false }) // 날짜 순서 에러도 초기화
              }}
            />
            {errors.startDate && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                시작일 선택 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 종료일 (HTML date Input) */}
        <FormRow
          htmlFor="endDate"
          labelText="종료일"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value)
                setErrors({ ...errors, endDate: false, dateOrder: false }) // 날짜 순서 에러도 초기화
              }}
            />
            {errors.endDate && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                {errors.dateOrder
                  ? '종료일은 시작일보다 늦어야 합니다.'
                  : '종료일 선택 필수'}
              </p>
            )}
          </div>
        </FormRow>

        {/* 상태 선택 드롭다운 */}
        <FormRow
          htmlFor="statusSelect"
          labelText="상태"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Dropdown
              id="statusSelect"
              name="statusSelect"
              value={status}
              onChange={(option) => {
                setStatus(option.value)
                setErrors({ ...errors, status: false })
              }}
              options={statusOptions}
              placeholder="상태를 선택해주세요."
            />
            {errors.status && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                상태 선택 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 버튼 */}
        <div className="mt-[38px] flex justify-end">
          <Button onClick={handleSubmit}>등록</Button>
        </div>
      </div>
    </Modal>
  )
}

export default AddGenerationModal
