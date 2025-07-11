import api from '@api/instance/axiosInstance'
import FilterIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import Dropdown from '@components/common/Dropdown'
import Icon from '@components/common/Icon'
import Label from '@components/common/Label'
import Modal from '@components/common/Modal'
import GenerationDetailModal from '@components/generations/GenerationDetailModal'
import { ADMIN_API_PATH } from '@constants/urls'
import type { TableRowData } from '@custom-types/table'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { useEffect, useState } from 'react'

// 페이지 상수 추가
const COUNT_LIMIT = 20

const generationHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'course_name' },
  { text: '기수', dataKey: 'number' },
  { text: '인원', dataKey: 'registered_students' },
  { text: '상태', dataKey: 'status' },
  { text: '시작일', dataKey: 'start_date' },
  { text: '종료일', dataKey: 'end_date' },
]

// api fetch
const fetchGenerations = async () => {
  const res = await api.get(ADMIN_API_PATH.GENERATIONS_LIST)
  return res.data.results
}

const fetchGenerationDetail = async (generationId: number) => {
  const res = await api.get(`generations/${generationId}/detail`)
  return res.data
}

const fetchCourses = async () => {
  const res = await api.get(ADMIN_API_PATH.COURSES)
  return res.data.results
}

const Generations = () => {
  const [generations, setGenerations] = useState<TableRowData[]>([])
  const [courses, setCourses] = useState<TableRowData[]>([])
  const [filteredData, setFilteredData] = useState<TableRowData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 모달 상태
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // 상세 조회용 선택된 기수 데이터
  const [selectedGeneration, setSelectedGeneration] =
    useState<TableRowData | null>(null)

  // 기수 목록 fetch
  useEffect(() => {
    const loadGenerations = async () => {
      try {
        const generationsRes = await fetchGenerations()
        const formattedGenerations = generationsRes.map(
          (gen: TableRowData) => ({
            ...gen,
            number: `${gen.number}기`,
            registered_students: `${gen.registered_students}명 / ${gen.max_student}명`,
          })
        )
        setGenerations(formattedGenerations)
        setFilteredData(formattedGenerations)
      } catch (err) {
        if (err instanceof Error) setError(err)
        else console.error('알 수 없는 에러:', err)
      } finally {
        setLoading(false)
      }
    }
    loadGenerations()
  }, [])

  // 모달 열 때 과정 목록 fetch
  useEffect(() => {
    const loadCourses = async () => {
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
    loadCourses()
  }, [isFilterModalOpen, courses.length])

  // 드롭다운 옵션
  const courseOptions = [
    { label: '전체 보기', value: '' },
    ...Array.from(
      new Map(
        courses.map((course) => [
          course.name,
          {
            label: String(course.name),
            value: String(course.id),
          },
        ])
      ).values()
    ),
  ]

  const [selectedCourseOption, setSelectedCourseOption] = useState(
    courseOptions[0]
  )

  // 과정별 필터링
  const handleFilterApply = () => {
    const filtered = selectedCourseOption.value
      ? generations.filter(
          (item) => item.course_name === selectedCourseOption.label
        )
      : generations

    setFilteredData(filtered)
    setIsFilterModalOpen(false)
  }

  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: filteredData,
      count: COUNT_LIMIT,
    })

  // 테이블 로우 클릭 시 기수 상세조회 fetch
  const handleRowClick = async (rowData: TableRowData) => {
    try {
      const detailData = await fetchGenerationDetail(rowData.id)
      setSelectedGeneration(detailData)
      setIsDetailModalOpen(true)
    } catch (err) {
      if (err instanceof Error) setError(err)
      else console.error('알 수 없는 에러:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="w-[1600px] p-[30px]">
      <div className="mb-[25px] flex justify-between">
        <h2 className="text-lg font-semibold">기수 조회</h2>
        <Button
          onClick={() => setIsFilterModalOpen(true)}
          variant="VARIANT8"
          className="pr-5"
        >
          <Icon icon={FilterIcon} size={16} />
          과정별 필터링
        </Button>
      </div>
      <Modal
        modalId="course-filter-modal"
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        className="h-[275px]"
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
          value={selectedCourseOption.value}
          onChange={setSelectedCourseOption}
          options={courseOptions}
          wrapClassName="w-[360px] mb-auto"
        />
        {selectedCourseOption.value && (
          <p className="mb-[37px] text-[14px] text-[#222]">
            현재 선택된 과정은{' '}
            <span className="font-[600] text-[#522193]">
              {selectedCourseOption.label}
            </span>{' '}
            입니다.
          </p>
        )}
        <Button onClick={handleFilterApply} className="self-end">
          조회
        </Button>
      </Modal>
      <DataTable
        headerData={generationHeaders}
        tableItem={paginatedData}
        isCheckBox={false}
        sortKeys={[]}
        sortKey={null}
        sortOrder={'asc'}
        sortByKey={() => {}}
        isTime
        onClick={handleRowClick}
      />
      <GenerationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        selectedGeneration={selectedGeneration}
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
