import FilterIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import Dropdown from '@components/common/Dropdown'
import Icon from '@components/common/Icon'
import Label from '@components/common/Label'
import Modal from '@components/common/Modal'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'
import type { TableRowData } from '@custom-types/table'
import { useClientPagination } from '@hooks/data-table/usePagination'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMTMyNjY1LCJpYXQiOjE3NTIwNDYyNjUsImp0aSI6IjAxMWYzYmY4ODU2NTQ0OTc5NWQ2YTYxZGEwNTliYjJkIiwidXNlcl9pZCI6MTJ9.DbqYnFwkvtlVBZxGlj8JFIpKMRDDX1CZfirNM9pcVbI'

// 페이지 상수 추가
const COUNT_LIMIT = 20

// 공통 API 인스턴스
const apiClient = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

const fetchGenerations = async () => {
  const res = await apiClient.get(ADMIN_API_PATH.GENERATIONS_LIST)
  console.log(res)
  return res.data.results
}

const fetchCourses = async () => {
  const res = await apiClient.get(ADMIN_API_PATH.COURSES)
  console.log(res)
  return res.data.results
}

const courseHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'course_name' },
  { text: '기수', dataKey: 'number' },
  { text: '인원', dataKey: 'registered_students' },
  { text: '상태', dataKey: 'status' },
  { text: '시작일', dataKey: 'start_date' },
  { text: '종료일', dataKey: 'end_date' },
]

const Generations = () => {
  const [generations, setGenerations] = useState<TableRowData[]>([])
  const [courses, setCourses] = useState<TableRowData[]>([])
  const [filteredData, setFilteredData] = useState<TableRowData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // 기수 목록 fetch
  useEffect(() => {
    const fetchGenerationsData = async () => {
      try {
        const generationsRes = await fetchGenerations()
        setGenerations(generationsRes)
      } catch (err) {
        if (err instanceof Error) setError(err)
        else console.error('알 수 없는 에러:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGenerationsData()
  }, [])

  // 과정 API는 모달 열 때 fetch
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!isFilterModalOpen) return
      if (courses.length > 0) return // 이미 가져온 경우 fetch 생략

      try {
        const courseRes = await fetchCourses()
        setCourses(courseRes)
      } catch (err) {
        if (err instanceof Error) setError(err)
        else console.error('알 수 없는 에러:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourseData()
  }, [isFilterModalOpen])

  const courseOptions = [
    { label: '과정을 선택하세요', value: '' },
    ...courses.map((course) => ({
      label: String(course.name),
      value: String(course.id),
    })),
  ]

  const [tempSelectedCourse, setTempSelectedCourse] = useState(courseOptions[0])
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0])

  const handleFilterApply = () => {
    setSelectedCourse(tempSelectedCourse)
    setIsFilterModalOpen(false)

    let tempData = [...generations]

    // 과정별 필터링
    if (selectedCourse.value) {
      tempData = tempData.filter(
        (quiz) => quiz.subject_name === selectedCourse.value
      )
    }

    setFilteredData(tempData)
  }

  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: filteredData,
      count: COUNT_LIMIT,
    })

  if (loading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="w-[1600px] p-[30px]">
      <div className="mb-[25px] flex justify-between">
        <h2 className="text-lg font-semibold">기수 조회</h2>
        <Button onClick={() => setIsFilterModalOpen(true)} variant="VARIANT8">
          <Icon icon={FilterIcon} size={16} />
          과정별 필터링
        </Button>
      </div>
      <Modal
        modalId="course-filter-modal"
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        paddingSize={30}
      >
        <Label
          htmlFor="course"
          labelText="과정별 필터링"
          className="mb-[10px] h-[22px] bg-white p-0 text-lg font-semibold"
        />
        <p className="mb-[20px] text-sm">
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
        <Button>등록</Button>
      </div>
    </div>
  )
}
export default Generations
