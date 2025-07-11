import api from '@api/instance/axiosInstance'
import FilterIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import Icon from '@components/common/Icon'
import SearchBar from '@components/common/SearchBar'
import ScheduleModal from '@components/create-schedule/ScheduleModal'
import AddExamModal from '@components/quizzes/add-exam-modal/AddExamModal'
import CourseFilterModal from '@components/quizzes/course-filter-modal/CourseFilterModal'
import DetailModal from '@components/quizzes/detail-modal/DetailModal'
import { ADMIN_API_PATH } from '@constants/urls'
import type { SchedulePayload } from '@custom-types/createSchedule'
import type { TableRowData } from '@custom-types/table'
import { useServerPagination } from '@hooks/data-table/usePagination'
import { useSort } from '@hooks/data-table/useSort'
import { quizAPI } from '@lib/api/scheduleApi'
import { useScheduleStore } from '@store/create-schedule/scheduleStore'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)

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

  const handleTableClick = (quizData: TableRowData) => {
    setSelectedTestId(Number(quizData.id))
    setIsDetailModalOpen(true)
  }

  const handleDeployButtonClick = (quizData: TableRowData) => {
    openScheduleModal({
      test_id: Number(quizData.id),
      test_title: String(quizData.title),
      subject_title: String(quizData.subject_name),
    })
  }

  const renderMap = {
    deploy: (_: unknown, rowData: TableRowData) => (
      <Button
        variant="VARIANT5"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()

          handleDeployButtonClick(rowData)
        }}
      >
        배포
      </Button>
    ),
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

  // 정렬, 검색, 필터, 페이지 state
  const { sortedData, sortByKey, sortKey, sortOrder } = useSort(quizzes)
  const [searchKeyword, setSearchKeyword] = useState('')
  const { currentPage, totalPages, goToPage, setTotalCount, setCurrentPage } =
    useServerPagination({ pageSize: 10 })
  const [filteredData, setFilteredData] = useState<TableRowData[]>([])
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0])

  const fetchQuizzes = useCallback(async () => {
    setLoading(true)
    try {
      const quizzesRes = await api.get(ADMIN_API_PATH.TEST, {
        params: {
          page: currentPage,
          page_size: 10,
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
  }, [currentPage, searchKeyword, selectedCourse.value, setTotalCount])

  useEffect(() => {
    fetchQuizzes()
  }, [fetchQuizzes])

  // 과정 필터 모달을 위한 데이터 로딩
  useEffect(() => {
    // 모달이 열려 있고, 아직 course 데이터가 없을 때만 API 호출
    if (isFilterModalOpen && course.length === 0) {
      api
        .get(ADMIN_API_PATH.COURSES_DROPDOWN)
        .then((res) => setCourse(res.data))
    }
  }, [isFilterModalOpen, course.length])

  // 시험 생성 모달을 위한 데이터 로딩
  useEffect(() => {
    if (isOpen && subjects.length === 0) {
      api
        .get(ADMIN_API_PATH.SUBJECTS)
        .then((res) => setSubjects(res.data.results))
    }
  }, [isOpen, subjects.length])

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

  const openModal = () => {
    setIsOpen(true)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  if (isDetailModalOpen && selectedTestId !== null) {
    // 시험 상세정보 조회/수정/삭제 모달
    return <DetailModal testId={selectedTestId} />
  }

  return (
    <div className="min-w-[1600px] p-[30px]">
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

      <DataTable
        headerData={TableHeaderItem} // 표제목,열 개수
        tableItem={filteredData} // 페이지네이션된 데이터 전달
        isCheckBox={false} // 체크박스 여부
        sortKeys={SortItem} // 정렬할 데이터 지정
        sortKey={sortKey} // 현재 정렬 키 전달
        sortOrder={sortOrder} // 현재 정렬 방향 전달
        sortByKey={sortByKey} // 정렬 함수 전달
        isTime // 시간 표시 여부
        onClick={handleTableClick}
        renderMap={renderMap}
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

      {/* 과정 필터링 모달 */}
      <CourseFilterModal
        isOpen={isFilterModalOpen}
        setIsOpen={setIsFilterModalOpen}
        courseOptions={courseOptions}
        setSelectedCourse={setSelectedCourse}
        setCurrentPage={setCurrentPage}
      />
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
      {/* 시험을 추가할 때 사용하는 모달 */}
      <AddExamModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subjects={subjects}
        fetchData={fetchQuizzes}
      />
    </div>
  )
}
export default Quizzes
