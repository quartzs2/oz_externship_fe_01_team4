import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Modal from '@components/common/Modal'
import DropdownField from '@components/common/DropdownField'
import Icon from '@components/common/Icon'
import SearchIcon from '@assets/icons/search.svg?react'
import { useState, useMemo, useEffect } from 'react'
import Pagination from '@components/common/data-table/Pagination'
import { useSort } from '@hooks/data-table/useSort'
import { useClientPagination } from '@hooks/data-table/usePagination'
import {
  mapDeployment,
  type Deployment,
  type DeploymentResponse,
} from '@custom-types/deployments'
import SearchBar from '@components/common/SearchBar'
import axios from 'axios'
import { filterOption } from '@utils/filterOption'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'

// 페이지 상수
const COUNT_LIMIT = 20

// 테이블 헤더
const deploymentHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'testTitle' },
  { text: '과목명', dataKey: 'subjectTitle' },
  { text: '과정 | 기수', dataKey: 'courseGeneration' },
  { text: '응시자 수', dataKey: 'totalParticipants' },
  { text: '평균 점수', dataKey: 'averageScore' },
  { text: '생성 일시', dataKey: 'createdAt' },
  { text: '배포 상태', dataKey: 'deploySwitch' },
]

// 공통 API 인스턴스
const api = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Authorization: `Bearer ${access_token}`,
  },
})

// fetch 함수
const fetchAPI = async () => {
  const res = await api.get<DeploymentResponse>(ADMIN_API_PATH.TEST_DEPLOYMENTS)
  return res.data.results.map(mapDeployment)
}

const Deployments = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 필터링 옵션 상태
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedGeneration, setSelectedGeneration] = useState('')
  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState('')

  const [fetchData, setFetchData] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // API 호출 (임시)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deployments = await fetchAPI()
        setFetchData(deployments)
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
    fetchData()
  }, [])

  // 테이블에 들어갈 데이터
  const tableData: Deployment[] = useMemo(() => fetchData, [fetchData])

  // 드롭다운 옵션
  const courseOptions = filterOption(
    tableData.map((d) => ({ course: d.courseGeneration?.split(' ')[0] })),
    'course',
    (val) => `${val} 부트캠프`
  )
  const generationOptions = filterOption(
    tableData.map((d) => ({ generation: d.courseGeneration?.split(' ')[1] })),
    'generation'
  )

  // 필터링 데이터 저장
  const [filteredData, setFilteredData] = useState<Deployment[]>([])

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
      const [course, generation] = item.courseGeneration.split(' ')
      const isCourseMatch = selectedCourse ? course === selectedCourse : true
      const isGenMatch = selectedGeneration
        ? generation === selectedGeneration
        : true
      const isKeywordMatch = searchKeyword
        ? item.subjectTitle.includes(searchKeyword)
        : true
      return isCourseMatch && isGenMatch && isKeywordMatch
    })
    setFilteredData(result)
  }

  // 초기 호출
  useEffect(() => {
    if (fetchData.length > 0) {
      setFilteredData(fetchData)
    }
  }, [fetchData])

  if (loading)
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
