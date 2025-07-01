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
import { usePagination } from '@hooks/data-table/usePagination'
import { useSort } from '@hooks/data-table/useSort'
import { useCustomToast } from '@hooks/toast/useToast'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'
// import axios from 'axios'

// 표제목 상수화;
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

// 에러 방지용 임시 데이터
const quizData = [
  {
    id: 1,
    title: 'HTML 쪽지시험',
    subject_name: 'HTML',
    question_count: 0,
    submission_count: 0,
    created_at: '2025-07-01T05:11:15.236Z',
    updated_at: '2025-07-01T05:11:15.236Z',
  },
  {
    id: 2,
    title: 'Python 쪽지시험',
    subject_name: 'Python',
    question_count: 0,
    submission_count: 0,
    created_at: '2025-08-01T05:11:15.236Z',
    updated_at: '2025-08-01T05:11:15.236Z',
  },
]

const subjects = [
  {
    id: 1,
    title: 'HTML',
    number_of_days: 4,
    number_of_hours: 16,
    course_name: '웹 개발 초격차 프론트엔드 부트캠프',
    status: true,
    created_at: '2025-06-23T10:30:00Z',
    updated_at: '2025-06-23T10:30:00Z',
  },
  {
    id: 2,
    title: 'Python',
    number_of_days: 3,
    number_of_hours: 12,
    course_name: '웹 개발 초격차 백엔드 부트캠프',
    status: false,
    created_at: '2025-06-23T11:00:00Z',
    updated_at: '2025-06-23T11:00:00Z',
  },
]

const courseOptions = [
  { label: '과정을 선택하세요', value: '' },
  ...subjects.map((subject) => ({
    label: subject.course_name,
    value: subject.title,
  })),
]

//드롭다운 옵션 상수화
const subjectOptions = [
  { label: '과목을 선택하세요', value: '' },
  ...subjects.map((subject) => ({
    label: String(subject.title ?? ''),
    value: String(subject.id),
  })),
]

const SortItem = ['title'] // 정렬할 데이터 지정

// 쪽지시험 관리
const Quizzes = () => {
  // const [dummySearch, setDummySearch] = useState('') build 에러로 주석 처리

  const { sortedData, sortByKey, sortKey, sortOrder } = useSort(quizData)

  const [searchKeyword, setSearchKeyword] = useState('') // 현재 검색어 저장

  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0])

  const [filteredData, setFilteredData] = useState(sortedData) // 화면에 최종 표시할 필터링된 데이터 (기본값: 정렬된 데이터 전체)

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    item: filteredData, // <--- 기존 item 대신 sortedData를 넘겨줌 -> filteredData로 변경
    count: 10,
  })

  useEffect(() => {
    let tempData = [...sortedData] // 현재 정렬된 데이터 복사

    // 과정별 필터링
    if (selectedCourse.value) {
      tempData = tempData.filter(
        (quiz) => quiz.subject_name === selectedCourse.value
      )
    }
    // 쪽지시험 또는 과목 검색 필터링
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
  }, [sortedData, searchKeyword, selectedCourse])

  const toast = useCustomToast()

  const [isTitle, setIsTitle] = useState(true)
  const [isSelectedSubject, setIsSelectedSubject] = useState(true)
  const [isImageFile, setIsImageFile] = useState(true)

  const handleSubmit = () => {
    let isValid = true

    setIsTitle(true)
    setIsSelectedSubject(true)

    if (!title.trim()) {
      setIsTitle(false)
      isValid = false
    }

    if (!selectedSubject.value) {
      setIsSelectedSubject(false)
      isValid = false
    }

    if (!file) {
      setIsImageFile(false)
      isValid = false
    }

    if (!isValid) return

    setIsOpen(false)
    resetForm()
    setIsTitle(true)
    setIsSelectedSubject(true)

    toast.success('성공적으로 쪽지시험이 생성되었습니다.', {
      style: 'style4',
      duration: 5000,
      hasActionButton: false,
      actionLabel: '확인',
      hasCloseButton: true,
      hasIcon: true,
    })
  }

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const openFilterModal = () => {
    setIsFilterModalOpen(true)
  }
  const closeFilterModal = () => {
    setIsFilterModalOpen(false)
  }

  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="mx-6 my-7">
      <h2 className="mb-[26px] text-[18px] font-semibold">쪽지시험 조회</h2>
      <div className="mb-[18px] flex justify-between">
        <SearchBar
          onSearch={(keyword) => setSearchKeyword(keyword)}
          placeholder="검색어를 입력하세요."
        />
        <Button
          onClick={openFilterModal}
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
        onClose={closeFilterModal}
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
          onChange={setSelectedCourse}
          value={selectedCourse.value}
          options={courseOptions}
          wrapClassName='w-[360px] mb-auto'
        />
        {selectedCourse.value && (
          <p className="mb-[36px] text-[14px] text-[#222]">
            현재 선택된 과정은{' '}
            <span className="font-[600] text-[#522193]">
              {selectedCourse.label}
            </span>{' '}
            입니다.
          </p>
        )}
        <Button onClick={closeFilterModal} className="self-end">
          조회
        </Button>
      </Modal>

      <DataTable
        headerData={TableHeaderItem} // 표제목,열 개수
        tableItem={paginatedData} // 페이지네이션된 데이터 전달
        isCheckBox={false} // 체크박스 여부
        sortKeys={SortItem} // 정렬할 데이터 지정
        sortKey={sortKey} // 현재 정렬 키 전달
        sortOrder={sortOrder} // 현재 정렬 방향 전달
        sortByKey={sortByKey} // 정렬 함수 전달
        isTime // 시간 표시 여부
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />

      <div className="flex justify-end">
        <Button onClick={openModal}>생성</Button>
      </div>
      <Modal
        modalId="example-modal"
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
          <FormRow htmlFor="title" labelText="제목" labelClassName="h-[50px]">
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
          <FormRow htmlFor="subject" labelText="과목" labelClassName="h-[50px]">
            <div className="flex w-full items-center gap-2">
              <Dropdown
                id="subject"
                name="subject"
                value={selectedSubject.value}
                onChange={setSelectedSubject}
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
            labelClassName="h-[191px] border-b border-[#DDDDDD]"
            valueClassName="h-[191px] border-b border-[#DDDDDD]"
          >
            <div
              className={cn(
                `mt-4 h-[132px] w-[146px] overflow-hidden border border-[#DDD] bg-[#F7F7F7]`,
                `flex items-center justify-center`
              )}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="미리보기"
                  className="max-h-[96px] max-w-[96px] object-contain"
                />
              ) : (
                <span className="text-sm">미리보기 없음</span>
              )}
            </div>

            <div className="mt-1 ml-4 flex items-center gap-5">
              <p className="text-[10px] whitespace-nowrap text-[#666666]">
                96 x 96 사이즈로 등록하세요.
              </p>
              <p className="max-w-[150px] truncate text-sm underline">
                {file && file.name}
              </p>
              {!isImageFile && (
                <p className="text-sm text-[#CC0A0A]">
                  로고 업로드를 해주세요.
                </p>
              )}
              <label className="cursor-pointer rounded border border-[#DDDDDD] bg-white px-3 py-1 text-sm">
                파일 첨부
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e)
                    setIsImageFile(true)
                  }}
                />
              </label>
            </div>
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
