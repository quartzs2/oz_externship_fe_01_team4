import FilterIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import Dropdown from '@components/common/Dropdown'
import FormRow from '@components/common/FormRow'
import Icon from '@components/common/Icon'
import Input from '@components/common/Input'
import Label from '@components/common/Label'
import Modal from '@components/common/Modal'
import SearchBar from '@components/common/SearchBar'
import type { TableRowData } from '@custom-types/table'
import { useServerPagination } from '@hooks/data-table/usePagination'
import { useSort } from '@hooks/data-table/useSort'
import { useCustomToast } from '@hooks/toast/useToast'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ADMIN_API_PATH } from '@constants/urls'
import ScheduleModal from '@components/create-schedule/ScheduleModal'
import { useScheduleStore } from '@store/create-schedule/scheduleStore'
import { quizAPI } from '@lib/api/scheduleApi'
import type { SchedulePayload } from '@custom-types/createSchedule'
import api from '@api/axiosInstance'
import ImageUploader from '@components/common/ImageUploader'

// 표제목 상수화
const TableHeaderItem = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'title' },
  { text: '과목명', dataKey: 'subject_name' },
  { text: '총 문제 수', dataKey: 'question_count' },
  { text: '응시 수', dataKey: 'submission_count' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
  { text: '', dataKey: 'deploy' },
]

const SortItem = ['title', 'created_at'] // 정렬할 데이터 지정

// 쪽지시험 관리
const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<TableRowData[]>([])
  const [subjects, setSubjects] = useState<TableRowData[]>([])
  const [course, setCourse] = useState<TableRowData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const { isModalOpen, selectedQuiz, openScheduleModal, closeScheduleModal } =
    useScheduleStore()

  const coursesData = [
    { id: 1, name: '웹 개발 초급자 프론트엔드 부트캠프' },
    { id: 2, name: 'AI 백엔드 심화과정' },
  ]

  const generationsData = [
    { id: 8, name: '8기' },
    { id: 9, name: '9기' },
    { id: 10, name: '10기' },
  ]

  // 배포 버튼 클릭 핸들러 추가
  const handleDeployClick = (quizData: TableRowData) => {
    openScheduleModal({
      test_id: Number(quizData.id),
      test_title: String(quizData.title),
      subject_title: String(quizData.subject_name),
    })
  }

  // 스케줄 제출 핸들러 추가
  const handleScheduleSubmit = async (payload: SchedulePayload) => {
    await quizAPI.setDeploySchedule(payload)
  }

  // 드롭다운 옵션
  const courseOptions = useMemo(() => {
    return [
      { label: '과정을 선택하세요', value: '' },
      ...Array.from(
        new Map(
          course.map((course) => [
            course.name,
            {
              label: String(course.name),
              value: String(course.id),
            },
          ])
        ).values()
      ),
    ]
  }, [course])

  // subjectOptions
  const subjectOptions = useMemo(() => {
    return [
      { label: '과목을 선택하세요', value: '' },
      ...subjects.map((subject) => ({
        label: String(subject.title ?? ''),
        value: String(subject.id),
      })),
    ]
  }, [subjects])

  // 정렬, 검색, 필터, 페이지 state
  const { sortedData, sortByKey, sortKey, sortOrder } = useSort(quizzes)
  const [searchKeyword, setSearchKeyword] = useState('')
  const { currentPage, totalPages, goToPage, setTotalCount, setCurrentPage } =
    useServerPagination({ pageSize: 10 })
  const [filteredData, setFilteredData] = useState<TableRowData[]>([])
  const [tempSelectedCourse, setTempSelectedCourse] = useState(courseOptions[0])
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0])

  // API 추후 수정 예정
  const fetchData = useCallback(async () => {
    const pageSize = 10
    setLoading(true)
    try {
      // 첫 렌더링 또는 모달 오픈 시에만 과목/과정 데이터 요청
      let subjectsRes, courseRes
      if (isOpen) {
        subjectsRes = await api.get(ADMIN_API_PATH.SUBJECTS)
        setSubjects(subjectsRes.data.results)
      } else if (isFilterModalOpen) {
        courseRes = await api.get(ADMIN_API_PATH.COURSES_DROPDOWN)
        setCourse(courseRes.data)
      }

      // 쪽지시험 데이터는 항상 요청
      const quizzesRes = await api.get(ADMIN_API_PATH.TEST, {
        params: {
          page: currentPage,
          page_size: pageSize,
          search: searchKeyword,
          course_id: selectedCourse.value || undefined,
          ordering: 'recent',
        },
      })
      setQuizzes(quizzesRes.data.results)
      setTotalCount(quizzesRes.data.count)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, [
    currentPage,
    searchKeyword,
    selectedCourse.value,
    setTotalCount,
    isOpen,
    isFilterModalOpen,
  ])

  // 검색어나 필터 변경 시 fetchData 재호출
  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  // 쪽지시험 또는 과목 검색 필터링
  useEffect(() => {
    let tempData = [...sortedData] // 현재 정렬된 데이터 복사

    const filterByKeyword = (quiz: TableRowData) => {
      if (!searchKeyword) return true

      const keyword = searchKeyword.toLowerCase()
      const titleMatches =
        typeof quiz.title === 'string' &&
        quiz.title.toLowerCase().includes(keyword)
      const subjectMatches =
        typeof quiz.subject_name === 'string' &&
        quiz.subject_name.toLowerCase().includes(keyword)

      return titleMatches || subjectMatches
    }

    tempData = tempData.filter(filterByKeyword)

    setFilteredData(tempData)
  }, [sortedData, searchKeyword])

  const toast = useCustomToast()

  const [isTitle, setIsTitle] = useState(true)
  const [isSelectedSubject, setIsSelectedSubject] = useState(true)
  const [isImageFile, setIsImageFile] = useState(true)

  const validateForm = () => {
    const isTitleValid = Boolean(title.trim())
    const isSubjectValid = Boolean(selectedSubject.value)
    const isFileValid = Boolean(file)

    setIsTitle(isTitleValid)
    setIsSelectedSubject(isSubjectValid)
    setIsImageFile(isFileValid)

    return isTitleValid && isSubjectValid && isFileValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsOpen(false)
    resetForm()

    try {
      await postQuiz()
      await fetchData()
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

  const handleFilterApply = () => {
    setSelectedCourse(tempSelectedCourse)
    setCurrentPage(1)
    setIsFilterModalOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const resetForm = () => {
    setTitle('')
    setSelectedSubject(subjectOptions[0])
    setIsTitle(true)
    setIsSelectedSubject(true)
    setIsImageFile(true)
    setPreview(null)
    setFile(null)
  }

  const [selectedSubject, setSelectedSubject] = useState(subjectOptions[0])
  const [title, setTitle] = useState('')

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const imageUrl = URL.createObjectURL(selectedFile)
      setPreview(imageUrl)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="w-[1600px] p-[30px]">
      <h2 className="mb-[26px] text-[18px] font-semibold">쪽지시험 조회</h2>
      <div className="mb-[17px] flex justify-between">
        <SearchBar
          onSearch={(keyword) => {
            setSearchKeyword(keyword)
            setCurrentPage(1)
          }}
          placeholder="검색어를 입력하세요."
        />
        <Button
          onClick={() => setIsFilterModalOpen(true)}
          variant="VARIANT8"
          className="pr-[20px]"
        >
          <Icon icon={FilterIcon} size={16} />
          과정별 필터링
        </Button>
      </div>

      <Modal
        modalId="quizzes-course-filter-modal"
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        className="h-[276px] w-[458px]"
        paddingSize={30}
      >
        <Label
          htmlFor="course"
          labelText="과정별 필터링"
          className="mb-[10px] h-[22px] bg-white p-0 text-[18px] font-semibold"
        />
        <p className="mb-[20px] text-[14px]">
          필터를 적용할 카테고리를 선택해주세요.
        </p>
        <Dropdown
          id="course"
          name="course"
          value={tempSelectedCourse.value}
          onChange={setTempSelectedCourse}
          options={courseOptions}
          wrapClassName="w-[360px] mb-auto"
        />
        {tempSelectedCourse.value && (
          <p className="mb-[36px] text-[14px] text-[#222]">
            현재 선택된 과정은{' '}
            <span className="font-[600] text-[#522193]">
              {tempSelectedCourse.label}
            </span>{' '}
            입니다.
          </p>
        )}
        <Button onClick={handleFilterApply} className="self-end">
          조회
        </Button>
      </Modal>

      <DataTable
        headerData={TableHeaderItem} // 표제목,열 개수
        tableItem={filteredData} // 페이지네이션된 데이터 전달
        isCheckBox={false} // 체크박스 여부
        sortKeys={SortItem} // 정렬할 데이터 지정
        sortKey={sortKey} // 현재 정렬 키 전달
        sortOrder={sortOrder} // 현재 정렬 방향 전달
        sortByKey={sortByKey} // 정렬 함수 전달
        isTime // 시간 표시 여부
        onClick={handleDeployClick} // 배포 버튼 클릭 핸들러
      />

      <div className="mt-[80px] flex justify-center">
        <div className="flex flex-1 justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
        <Button onClick={openModal}>생성</Button>
      </div>
      {/* 스케줄 배포 모달 */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={closeScheduleModal}
        testId={selectedQuiz?.test_id || 0}
        testTitle={selectedQuiz?.test_title || ''}
        subjectTitle={selectedQuiz?.subject_title || ''}
        courses={coursesData}
        generations={generationsData}
        onSubmit={handleScheduleSubmit}
      />
      <Modal
        modalId="quizzes-add-modal"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          resetForm()
          setIsTitle(true)
          setIsSelectedSubject(true)
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
                  setIsTitle(true)
                }}
              />
              {!isTitle && (
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
                    setIsSelectedSubject(true)
                  }
                }}
                options={subjectOptions}
              />
              {!isSelectedSubject && (
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
                setIsImageFile(true)
              }}
              isValid={isImageFile}
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
    </div>
  )
}
export default Quizzes
