import Button from '@components/common/Button'
import FormRow from '@components/common/FormRow'
import ImageUploader from '@components/common/ImageUploader'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import { useCustomToast } from '@hooks/toast/useToast'
import { useState } from 'react'
import { cn } from '@utils/cn'

type AddCoursesModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => void | Promise<void>
}

const AddCoursesModal = ({
  isOpen,
  setIsOpen,
  fetchData,
}: AddCoursesModalProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [courseName, setCourseName] = useState('')
  const [courseTag, setCourseTag] = useState('')
  const [courseIntroduction, setCourseIntroduction] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState({
    name: false,
    tag: false,
    description: false,
    file: false,
  })

  const toast = useCustomToast()

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
      name: !courseName.trim(),
      tag: !courseTag.trim(),
      description: !courseIntroduction.trim(),
      file: !file,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean) // error가 하나라도 있으면 false 반환
  }

  const postCourse = async () => {
    const formData = new FormData()
    formData.append('name', courseName)
    formData.append('tag', courseTag)
    formData.append('description', courseIntroduction)
    if (file) {
      formData.append('thumbnail_img_file', file)
    }

    const response = await api.post(ADMIN_API_PATH.COURSES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  const resetForm = () => {
    setCourseName('')
    setCourseTag('')
    setCourseIntroduction('')
    setPreview(null)
    setFile(null)
    setErrors({
      name: false,
      tag: false,
      description: false,
      file: false,
    })
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await postCourse()
      fetchData()
      setIsOpen(false)
      resetForm()
      toast.success('성공적으로 과정이 등록되었습니다.', {
        style: 'style4',
        duration: 5000,
        hasActionButton: false,
        actionLabel: '확인',
        hasCloseButton: true,
        hasIcon: true,
      })
    } catch {
      toast.error('과정 등록에 실패했습니다.')
    }
  }

  return (
    <Modal
      modalId="quizzes-add-modal"
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
        {/* 과정명 */}
        <FormRow
          htmlFor="courseName"
          labelText="과정명"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="courseName"
              name="courseName"
              type="text"
              value={courseName}
              placeholder="과정명을 입력해주세요."
              onChange={(e) => {
                setCourseName(e.target.value)
                setErrors({ ...errors, name: false })
              }}
            />
            {errors.name && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과정명 입력 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 과목태그 */}
        <FormRow
          htmlFor="courseTag"
          labelText="과목태그"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="courseTag"
              name="courseTag"
              type="text"
              value={courseTag}
              placeholder="과목태그를 입력해주세요."
              onChange={(e) => {
                setCourseTag(e.target.value)
                setErrors({ ...errors, tag: false })
              }}
            />
            {errors.tag && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과목태그 입력 필수
              </p>
            )}
          </div>
        </FormRow>
        {/* 과정 소개 */}
        <FormRow
          htmlFor="courseIntroduction"
          labelText="과정 소개"
          labelClassName="h-[168px]  pb-24 font-normal"
        >
          <div className="flex w-full gap-2">
            <div className="flex w-full items-center gap-2">
              <textarea
                id="courseIntroduction"
                name="courseIntroduction"
                value={courseIntroduction}
                onChange={(e) => {
                  setCourseIntroduction(e.target.value)
                  setErrors({ ...errors, description: false })
                }}
                placeholder="과정소개를 입력해주세요."
                className={cn(
                  'h-[152px] w-[506px] rounded-[3px] border-1 border-[#DDD] bg-white py-[10px] pr-[9px] pl-[12px] text-[14px]',
                  `resize-none placeholder-[#666] outline-none`
                )}
              />
              {errors.description && (
                <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                  과정 소개 입력 필수
                </p>
              )}
            </div>
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
export default AddCoursesModal
