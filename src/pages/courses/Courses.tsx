import api from '@api/instance/axiosInstance'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import FormRow from '@components/common/FormRow'
import ImageUploader from '@components/common/ImageUploader'
import Input from '@components/common/Input'
import Modal from '@components/common/Modal'
import { ADMIN_API_PATH } from '@constants/urls'
import type { TableRowData } from '@custom-types/table'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { useCustomToast } from '@hooks/toast/useToast'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'

// 페이지 상수 추가
const COUNT_LIMIT = 20

const fetchAPI = async () => {
  const res = await api.get(ADMIN_API_PATH.COURSES)
  console.log(res)
  return res.data.results
}

const courseHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'name' },
  { text: '운영 기수', dataKey: 'active_generations_count' },
  { text: '수강 인원', dataKey: 'total_students_count' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
]

const Courses = () => {
  const [coursesData, setCoursesData] = useState<TableRowData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  //과정 등록 모달 상태
  const [isCourseName, setIsCourseName] = useState(true)
  const [isCourseTag, setIsCourseTag] = useState(true)
  const [isCourseIntroduction, setIsCourseIntroduction] = useState(true)
  const [isImageFile, setIsImageFile] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const [courseName, setCourseName] = useState('')
  const [courseTag, setCourseTag] = useState('')
  const [courseIntroduction, setCourseIntroduction] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const fetchData = async () => {
    try {
      const courses = await fetchAPI()
      setCoursesData(courses)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        console.error('알 수 없는 에러:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const postCourseRes = async () => {
    const formData = new FormData()
    formData.append('name', courseName)
    formData.append('tag', courseTag)
    formData.append('description', courseIntroduction)
    if (file) {
      formData.append('thumbnail_img_file', file)
    }

    try {
      const response = await api.post(ADMIN_API_PATH.COURSES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (err) {
      console.error('과정 등록 실패:', err)
      throw err
    }
  }

  const validateForm = () => {
    const isCourseNameValid = Boolean(courseName.trim())
    const isCourseTagValid = Boolean(courseTag.trim())
    const isCourseIntroductionValid = Boolean(courseIntroduction.trim())
    const isFileValid = Boolean(file)

    setIsCourseName(isCourseNameValid)
    setIsCourseTag(isCourseTagValid)
    setIsCourseIntroduction(isCourseIntroductionValid)
    setIsImageFile(isFileValid)

    return (
      isCourseNameValid &&
      isCourseTagValid &&
      isFileValid &&
      isCourseIntroductionValid
    )
  }

  const toast = useCustomToast()

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsOpen(false)
    resetForm()

    try {
      await postCourseRes()
      await fetchData()
      toast.success('성공적으로 등록되었습니다.', {
        style: 'style4',
        duration: 5000,
        hasActionButton: false,
        actionLabel: '확인',
        hasCloseButton: true,
        hasIcon: true,
      })
    } catch {
      toast.error('등록에 실패했습니다. 중복을 피하시고 다시 확인해주세요.')
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const resetForm = () => {
    setCourseName('')
    setCourseTag('')
    setCourseIntroduction('')
    setIsCourseName(true)
    setIsCourseTag(true)
    setIsCourseIntroduction(true)
    setIsImageFile(true)
    setPreview(null)
    setFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }

  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: coursesData,
      count: COUNT_LIMIT,
    })

  if (loading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <>
      <div className="w-[1600px] p-[30px]">
        <h2 className="mb-10 text-lg font-semibold">과정 조회</h2>
        <DataTable
          headerData={courseHeaders}
          tableItem={paginatedData}
          isCheckBox={false}
          sortKeys={[]}
          sortKey={null}
          sortOrder={'asc'}
          sortByKey={() => {}}
          isTime
        />
        <div className="mt-[82px] flex justify-center">
          <div className="flex flex-1 justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </div>
          <Button onClick={openModal}>등록</Button>
        </div>
      </div>
      <Modal
        modalId="quizzes-add-modal"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          resetForm()
          setIsCourseName(true)
          setIsCourseTag(true)
          setIsCourseIntroduction(true)
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
                  setIsCourseName(true)
                }}
              />
              {!isCourseName && (
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
                  setIsCourseTag(true)
                }}
              />
              {!isCourseTag && (
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
                    setIsCourseIntroduction(true)
                  }}
                  placeholder="과정소개를 입력해주세요."
                  className={cn(
                    'h-[152px] w-[506px] rounded-[3px] border-1 border-[#DDD] bg-white py-[10px] pr-[9px] pl-[12px] text-[14px]',
                    `resize-none placeholder-[#666] outline-none`
                  )}
                />
                {!isCourseIntroduction && (
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
                setIsImageFile(true)
              }}
              isValid={isImageFile}
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
    </>
  )
}
export default Courses
