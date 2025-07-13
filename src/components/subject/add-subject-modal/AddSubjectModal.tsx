import Button from '@components/common/Button'
import FormRow from '@components/common/FormRow'
import ImageUploader from '@components/common/ImageUploader'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import { useCustomToast } from '@hooks/toast/useToast'
import { useState } from 'react'
import Dropdown from '@components/common/Dropdown'
import { useQueryClient } from '@tanstack/react-query'
import { useCourses } from '@hooks/queries/useCourses'

type AddSubjectModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSubjectsModal = ({ isOpen, setIsOpen }: AddSubjectModalProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [subjectName, setSubjectName] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  const [numberOfDays, setNumberOfDays] = useState<string>('')
  const [numberOfHours, setNumberOfHours] = useState<string>('')
  const [status, setStatus] = useState<string>('true')
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState({
    subjectName: false,
    courseId: false,
    numberOfDays: false,
    numberOfHours: false,
    status: false,
    file: false,
  })

  const { data: courseOptionsData } = useCourses()

  const courseOptions =
    courseOptionsData?.map((course) => ({
      label: String(course.name ?? ''),
      value: String(course.id),
    })) ?? []

  const statusOptions = [
    { value: 'true', label: '활성화' },
    { value: 'false', label: '비활성화' },
  ]

  const toast = useCustomToast()
  const queryClient = useQueryClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }

  const validateForm = () => {
    const newErrors = {
      subjectName: !subjectName.trim(),
      courseId: !selectedCourseId,
      numberOfDays:
        !numberOfDays ||
        isNaN(Number(numberOfDays)) ||
        Number(numberOfDays) <= 0,
      numberOfHours:
        !numberOfHours ||
        isNaN(Number(numberOfHours)) ||
        Number(numberOfHours) <= 0,
      status: !(status === 'true' || status === 'false'),
      file: !file,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean) // error가 하나라도 있으면 false 반환
  }

  const postSubject = async () => {
    const formData = new FormData()
    formData.append('title', subjectName)
    formData.append('course_id', String(selectedCourseId))
    formData.append('number_of_days', String(numberOfDays))
    formData.append('number_of_hours', String(numberOfHours))
    formData.append('status', status)

    if (file) {
      formData.append('thumbnail_img_file', file) // 과목 썸네일 로고 이미지
    }

    const response = await api.post(ADMIN_API_PATH.SUBJECTS, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  const resetForm = () => {
    setSubjectName('')
    setSelectedCourseId('')
    setNumberOfDays('')
    setNumberOfHours('')
    setStatus('true')
    setPreview(null)
    setFile(null)
    setErrors({
      subjectName: false,
      courseId: false,
      numberOfDays: false,
      numberOfHours: false,
      status: false,
      file: false,
    })
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await postSubject()
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
      setIsOpen(false)
      resetForm()
      toast.success('성공적으로 과목이 등록되었습니다.', {
        style: 'style4',
        duration: 5000,
        hasActionButton: false,
        actionLabel: '확인',
        hasCloseButton: true,
        hasIcon: true,
      })
    } catch {
      toast.error('과목 등록에 실패했습니다.')
    }
  }

  return (
    <Modal
      modalId="subjects-add-modal"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        resetForm()
      }}
      paddingSize={32}
      isBackgroundDimmed
      closeButtonOffset={16}
    >
      <h1 className="mb-[53px] text-xl font-bold">신규 과정 등록</h1>

      <div className="flex flex-col">
        {/* 과목명 */}
        <FormRow
          htmlFor="subjectName"
          labelText="과목명"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="subjectName"
              name="subjectName"
              type="text"
              value={subjectName}
              placeholder="과목명을 입력해주세요."
              onChange={(e) => {
                setSubjectName(e.target.value)
                setErrors({ ...errors, subjectName: false })
              }}
            />
            {errors.subjectName && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과목명 입력 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 과정 선택 드롭다운 추가 */}
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
                setErrors({ ...errors, courseId: false })
              }}
              options={courseOptions}
              placeholder="과정을 선택해주세요."
            />
            {errors.courseId && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과정 선택 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 수강일수  */}
        <FormRow
          htmlFor="courseTag"
          labelText="수강일수"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="numberOfDays"
              name="numberOfDays"
              type="number"
              value={numberOfDays}
              placeholder="수강일수를 입력해주세요."
              onChange={(e) => {
                setNumberOfDays(e.target.value)
                setErrors({ ...errors, numberOfDays: false })
              }}
            />
            {errors.numberOfDays && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                수강일수 입력 필수
              </p>
            )}
          </div>
        </FormRow>
        {/* 시수  */}
        <FormRow
          htmlFor="courseIntroduction"
          labelText="시수"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full gap-2">
            <div className="flex w-full items-center gap-2">
              <Input
                id="numberOfHours"
                name="numberOfHours"
                type="number" // 숫자만 입력 받도록
                value={numberOfHours}
                placeholder="시수를 입력해주세요."
                onChange={(e) => {
                  setNumberOfHours(e.target.value)
                  setErrors({ ...errors, numberOfHours: false })
                }}
              />
              {errors.numberOfHours && (
                <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                  유효한 시수 입력 필수
                </p>
              )}
            </div>
          </div>
        </FormRow>

        {/* ⭐️ 상태 선택 드롭다운 추가 */}
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
                setStatus(option.value) // string으로 상태 변경
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

        {/* 로고 업로드 */}
        <FormRow
          htmlFor="logo"
          labelText="과정 로고 업로드"
          labelClassName="h-[191px] border-b border-[#DDDDDD]  pb-26 font-normal"
          valueClassName="h-[191px] border-b border-[#DDDDDD]"
        >
          <ImageUploader
            preview={preview}
            file={file}
            onFileChange={(e) => {
              handleFileChange(e)
              setErrors({ ...errors, file: false })
            }}
            isValid={!errors.file}
            errorMessage="과정 로고 업로드를 해주세요."
          />
        </FormRow>

        {/* 버튼 */}
        <div className="mt-[38px] flex justify-end">
          <Button
            onClick={() => {
              handleSubmit()
            }}
          >
            등록
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default AddSubjectsModal
