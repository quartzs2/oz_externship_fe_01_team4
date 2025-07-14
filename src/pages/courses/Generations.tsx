import FilterIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import Dropdown from '@components/common/Dropdown'
import Icon from '@components/common/Icon'
import Label from '@components/common/Label'
import Modal from '@components/common/Modal'
import GenerationDetailModal from '@components/generations/GenerationDetailModal'
import AddGenerationModal from '@components/generations/add-generation-modal/AddGenerationModal'
import type { TableRowData } from '@custom-types/table'
import { useServerPagination } from '@hooks/data-table/usePagination'
import { useEffect, useMemo, useState } from 'react'
import { useGenerations } from '@hooks/queries/useGenerations'
import { useGenerationDetail } from '@hooks/queries/useGenerationDetail'
import { useCourses } from '@hooks/queries/useCourses'
import type {
  GenerationDetails,
  Generation,
} from '@custom-types/generations/generations'

// 페이지 상수 추가
const COUNT_LIMIT = 10

const generationHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'course_name' },
  { text: '기수', dataKey: 'number' },
  { text: '인원', dataKey: 'registered_students' },
  { text: '상태', dataKey: 'status' },
  { text: '시작일', dataKey: 'start_date' },
  { text: '종료일', dataKey: 'end_date' },
]

const Generations = () => {
  // 페이지네이션
  const { currentPage, totalPages, goToPage, setTotalCount } =
    useServerPagination({
      pageSize: COUNT_LIMIT,
    })

  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(
    undefined
  )

  // 기수 목록 React Query로 fetch (과정 필터 id 전달)
  const {
    data: generationsData,
    isLoading: isGenerationsLoading,
    isError: isGenerationsError,
    error: generationsError,
  } = useGenerations(currentPage, COUNT_LIMIT, selectedCourseId)

  // 과정 목록 React Query로 fetch
  const {
    data: coursesData,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
    error: coursesError,
  } = useCourses()

  useEffect(() => {
    if (generationsData?.count !== undefined) {
      setTotalCount(generationsData.count)
    }
  }, [generationsData?.count, setTotalCount])

  // 모달 상태
  const [selectedGenerationId, setSelectedGenerationId] = useState<
    number | null
  >(null)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 상세 조회용 선택된 기수 데이터
  const {
    data: selectedGenerationDetail,
    isError: isDetailError,
    error: detailError,
  } = useGenerationDetail(selectedGenerationId)

  const isDetailModalOpen = selectedGenerationId !== null

  const closeDetailModal = () => {
    setSelectedGenerationId(null)
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  // 기수 데이터 가공
  const formattedGenerations = useMemo((): Generation[] => {
    return (generationsData?.results ?? []).map((gen) => ({
      ...gen,
      number: `${gen.number}기`,
      registered_students: `${gen.registered_students}명 / ${gen.max_student}명`,
      course_name: gen.course_name,
      course_id: gen.course_id,
    }))
  }, [generationsData?.results])

  // 드롭다운 옵션
  const courseOptions = useMemo(() => {
    const options = [{ label: '과정을 선택하세요', value: '' }]
    if (coursesData) {
      options.push(
        ...Array.from(
          new Map(
            coursesData.map((course) => [
              course.id,
              {
                label: String(course.name),
                value: String(course.id),
              },
            ])
          ).values()
        )
      )
    }
    return options
  }, [coursesData])

  // 드롭다운 선택값 (string 타입)
  const [selectedCourseOption, setSelectedCourseOption] = useState<{
    label: string
    value: string
  }>(courseOptions[0])

  useEffect(() => {
    if (courseOptions.length > 0 && selectedCourseOption.value === '') {
      setSelectedCourseOption(courseOptions[0])
    }
  }, [courseOptions, selectedCourseOption.value])

  // 필터 적용 함수: 선택된 과정 id 상태 업데이트 + 모달 닫기 + 페이지 1로 초기화
  const handleFilterApply = () => {
    const id =
      selectedCourseOption.value === ''
        ? undefined
        : Number(selectedCourseOption.value)
    setSelectedCourseId(id)
    setIsFilterModalOpen(false)
    goToPage(1)
  }

  // 로딩 및 에러 처리
  if (isGenerationsLoading || isCoursesLoading) {
    return <div className="h-full text-center text-3xl">Loading...</div>
  }
  if (isGenerationsError) {
    return (
      <div>
        기수 정보를 불러오는 중 에러가 발생했습니다: {generationsError?.message}
      </div>
    )
  }
  if (isCoursesError) {
    return (
      <div>
        과정 정보를 불러오는 중 에러가 발생했습니다: {coursesError?.message}
      </div>
    )
  }
  if (isDetailError && selectedGenerationId !== null) {
    return (
      <div>
        상세 정보를 불러오는 중 에러가 발생했습니다: {detailError?.message}
      </div>
    )
  }

  const handleRowClick = (rowData: TableRowData) => {
    setSelectedGenerationId(rowData.id)
  }

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
        tableItem={formattedGenerations}
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
        onClose={closeDetailModal}
        selectedGeneration={selectedGenerationDetail as GenerationDetails}
      />

      <div className="mt-[82px] flex justify-center">
        <div className="flex flex-1 justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
        <Button onClick={openAddModal}>등록</Button>
      </div>

      <AddGenerationModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />
    </div>
  )
}

export default Generations
