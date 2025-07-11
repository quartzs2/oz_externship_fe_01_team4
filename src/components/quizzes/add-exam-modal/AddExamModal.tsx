import api from '@api/instance/axiosInstance'
import Button from '@components/common/Button'
import Dropdown from '@components/common/Dropdown'
import FormRow from '@components/common/FormRow'
import ImageUploader from '@components/common/ImageUploader'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import { ADMIN_API_PATH } from '@constants/urls'
import type { TableRowData } from '@custom-types/table'
import { useCustomToast } from '@hooks/toast/useToast'
import { useMemo, useState } from 'react'

type AddExamModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  subjects: TableRowData[]
  fetchData: () => void | Promise<void>
}

const AddExamModal = ({
  isOpen,
  setIsOpen,
  subjects,
  fetchData,
}: AddExamModalProps) => {
  const subjectOptions = useMemo(() => {
    return [
      { label: '과목을 선택하세요', value: '' },
      ...subjects.map((subject) => ({
        label: String(subject.title ?? ''),
        value: String(subject.id),
      })),
    ]
  }, [subjects])

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [selectedSubject, setSelectedSubject] = useState(subjectOptions[0])
  const [title, setTitle] = useState('')
  const [errors, setErrors] = useState({
    title: false,
    subject: false,
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
      title: !title.trim(),
      subject: !selectedSubject.value,
      file: !file,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean) // error가 하나라도 있으면 false 반환
  }

  const postQuiz = async () => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('subject_id', selectedSubject.value) // subject_id는 id 문자열
    if (file) {
      formData.append('thumbnail_file', file)
    }

    try {
      const response = await api.post(
        `${ADMIN_API_PATH.TEST}${ADMIN_API_PATH.CREATE_QUIZZES}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return response.data
    } catch (err) {
      console.error('쪽지시험 생성 실패:', err)
      throw err
    }
  }

  const resetForm = () => {
    setTitle('')
    setSelectedSubject(subjectOptions[0])
    setPreview(null)
    setFile(null)
    setErrors({
      title: false,
      subject: false,
      file: false,
    })
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await postQuiz()
      fetchData()
      setIsOpen(false)
      resetForm()
      toast.success('성공적으로 쪽지시험이 생성되었습니다.', {
        style: 'style4',
        duration: 5000,
        hasActionButton: false,
        actionLabel: '확인',
        hasCloseButton: true,
        hasIcon: true,
      })
    } catch {
      toast.error('쪽지시험 생성에 실패했습니다.')
    }
  }

  return (
    <Modal
      modalId="quizzes-add-exam-modal"
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        resetForm()
      }}
      paddingSize={32}
      isBackgroundDimmed
      closeButtonOffset={16}
    >
      <h1 className="mb-[53px] text-xl font-bold">쪽지시험 등록</h1>

      <div className="flex flex-col">
        {/* 제목 */}
        <FormRow
          htmlFor="title"
          labelText="제목"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Input
              id="title"
              name="title"
              type="text"
              value={title}
              placeholder="제목을 입력하세요."
              onChange={(e) => {
                setTitle(e.target.value)
                setErrors({ ...errors, title: false })
              }}
            />
            {errors.title && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                제목 입력 필수
              </p>
            )}
          </div>
        </FormRow>

        {/* 과목 */}
        <FormRow
          htmlFor="subject"
          labelText="과목"
          labelClassName="h-[50px] font-normal"
        >
          <div className="flex w-full items-center gap-2">
            <Dropdown
              id="subject"
              name="subject"
              value={selectedSubject.value}
              onChange={(option) => {
                setSelectedSubject(option)
                if (option.value) {
                  setErrors({ ...errors, subject: false })
                } else {
                  setErrors({ ...errors, subject: true })
                }
              }}
              options={subjectOptions}
            />
            {errors.subject && (
              <p className="text-sm whitespace-nowrap text-[#CC0A0A]">
                과목 선택 필수
              </p>
            )}
          </div>
        </FormRow>
        {/* 로고 업로드 */}
        <FormRow
          htmlFor="logo"
          labelText="로고 등록"
          labelClassName="h-[191px] border-b border-[#DDDDDD] font-normal"
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
            errorMessage="로고 업로드를 해주세요."
          />
        </FormRow>

        {/* 버튼 */}
        <div className="mt-[38px] flex justify-end">
          <Button
            onClick={() => {
              handleSubmit()
            }}
          >
            생성
          </Button>
        </div>
      </div>
    </Modal>
  )
}
export default AddExamModal
