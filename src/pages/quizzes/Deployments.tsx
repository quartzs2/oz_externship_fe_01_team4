import SearchIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import DropdownField from '@components/common/DropdownField'
import Icon from '@components/common/Icon'
import Modal from '@components/common/Modal'
import SearchBar from '@components/common/SearchBar'
import { mapDeployment, type DeploymentRow } from '@custom-types/deployments'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { useSort } from '@hooks/data-table/useSort'
import { useDeployments } from '@hooks/queries/useDeployments'
import { filterOption } from '@utils/filterOption'
import { useEffect, useMemo, useState } from 'react'

// 페이지 상수
const COUNT_LIMIT = 20

// 테이블 헤더
const deploymentHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'test_title' },
  { text: '과목명', dataKey: 'subject_title' },
  { text: '과정 | 기수', dataKey: 'course_generation' },
  { text: '응시자 수', dataKey: 'total_participants' },
  { text: '평균 점수', dataKey: 'average_score' },
  { text: '생성 일시', dataKey: 'created_at' },
  { text: '배포 상태', dataKey: 'deploySwitch' },
]

const Deployments = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 필터링 옵션 상태
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedGeneration, setSelectedGeneration] = useState('')
  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState('')

  // React Query로 fetch
  const { data, isLoading, error } = useDeployments()

  // 테이블에 들어갈 데이터
  const tableData = useMemo(() => {
    if (!data?.results) return []
    return mapDeployment(data.results)
  }, [data])

  // '기수'를 분리하는 함수
  const splitCourseGeneration = (value: string) => {
    const trimmed = value.trim()
    const lastSpaceIndex = trimmed.lastIndexOf(' ')
    if (lastSpaceIndex === -1) return { course: trimmed, generation: '' }
    return {
      course: trimmed.slice(0, lastSpaceIndex),
      generation: trimmed.slice(lastSpaceIndex + 1),
    }
  }

  // 드롭다운 옵션
  const courseOptions = filterOption(
    tableData.map((d) => ({
      course: splitCourseGeneration(d.course_generation).course,
    })),
    'course',
    (val) => val
  )

  const generationOptions = filterOption(
    tableData.map((d) => ({
      generation: splitCourseGeneration(d.course_generation).generation,
    })),
    'generation'
  )

  // 필터링 데이터 저장
  const [filteredData, setFilteredData] = useState<DeploymentRow[]>([])

  // 정렬
  const { sortedData, sortKey, sortOrder, sortByKey } = useSort(filteredData)

  // 페이지네이션
  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: sortedData,
      count: COUNT_LIMIT,
    })

  // 필터링 기능
  const filterHandler = () => {
    if (!tableData.length) return
    const result = tableData.filter((item) => {
      const { course, generation } = splitCourseGeneration(
        item.course_generation
      )
      const isCourseMatch = selectedCourse ? course === selectedCourse : true
      const isGenMatch = selectedGeneration
        ? generation === selectedGeneration
        : true
      const isKeywordMatch = searchKeyword
        ? item.subject_title.includes(searchKeyword)
        : true
      return isCourseMatch && isGenMatch && isKeywordMatch
    })
    setFilteredData(result)
  }

  // 초기 호출
  useEffect(() => {
    if (tableData.length > 0) {
      setFilteredData(tableData)
    }
  }, [tableData])

  if (isLoading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="min-w-[1600px] p-[30px]">
      <h2 className="mb-5 text-lg font-semibold">쪽지 시험 배포 내역 조회</h2>
      <div className="flex justify-between">
        <SearchBar
          onSearch={(keyword) => {
            setSearchKeyword(keyword)
            filterHandler()
          }}
          placeholder="검색어를 입력하세요."
        ></SearchBar>
        <Button
          variant="VARIANT7"
          className="my-3 flex items-center justify-center gap-3"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon icon={SearchIcon} className="w-[16px]" size={16} />
          과정별 필터링
        </Button>
      </div>
      {/* 모달 */}
      <Modal
        modalId="deploymentFilterModal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-fit min-w-[500px] gap-2"
        paddingSize={36}
      >
        <h3 className="text-lg font-semibold">과정별 필터링</h3>
        <p className="mb-5 text-sm">필터를 적용할 조건을 선택해주세요.</p>
        <DropdownField
          label="과정"
          id="course"
          value={selectedCourse}
          onChange={setSelectedCourse}
          options={courseOptions}
        />
        <DropdownField
          label="기수"
          id="generation"
          value={selectedGeneration}
          onChange={setSelectedGeneration}
          options={generationOptions}
        />
        <Button
          className="mt-4 self-end"
          variant="VARIANT1"
          onClick={() => {
            filterHandler()
            setIsModalOpen(false)
          }}
        >
          조회
        </Button>
      </Modal>
      {/* 테이블 */}
      <DataTable
        headerData={deploymentHeaders}
        tableItem={paginatedData.map((item) => {
          return {
            ...item,
            deploySwitch: item.status === 'Activated',
          }
        })}
        isCheckBox={false}
        sortKeys={['created_at', 'total_participants', 'average_score']}
        sortKey={sortKey}
        sortOrder={sortOrder}
        sortByKey={sortByKey}
        isDeployStatus
        isTime
      />
      {/* 페이지네이션 */}
      <div className="pt-8 pb-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  )
}

export default Deployments
