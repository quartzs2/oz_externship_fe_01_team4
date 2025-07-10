import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import SubjectDetailModal from '@components/subject/SubjectDetailModal'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'
import { type Subject } from '@custom-types/subjects'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { renderStatus } from '@utils/renderColor'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

// 페이지 상수
const COUNT_LIMIT = 20
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMjAwMjQ0LCJpYXQiOjE3NTIxMTM4NDQsImp0aSI6IjI2NTY5YWFjOThmODQ4OTg5ZThmYjY3YzFhMDFkNDQyIiwidXNlcl9pZCI6MTJ9.-X7pdPo7shuftRK3KacAQNXyHLt5DFRVy0xlC2c6xvc'

// 테이블 헤더
const subjectHeader = [
  { text: 'ID', dataKey: 'id' },
  { text: '과목명', dataKey: 'title' },
  { text: '수강일수', dataKey: 'number_of_days' },
  { text: '시수', dataKey: 'number_of_hours' },
  { text: '과정', dataKey: 'course_name' },
  { text: '상태', dataKey: 'status' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
]

// 공통 API 인스턴스
const api = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

// fetch 함수
const fetchAPI = async () => {
  const res = await api.get<{ results: Subject[] }>(ADMIN_API_PATH.SUBJECTS)
  return res.data.results
}

// 과목 관리
const Subjects = () => {
  // fetch 상태
  const [fetchData, setFetchData] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 모달 상태
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // API 호출 (임시)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjects = await fetchAPI()
        setFetchData(subjects)
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
  const tableData: Subject[] = useMemo(() => fetchData, [fetchData])

  // 페이지네이션
  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: tableData,
      count: COUNT_LIMIT,
    })
  if (loading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="min-w-[1600px] p-[30px]">
      <h2 className="mb-5 text-lg font-semibold">과목 조회</h2>
      {/* 테이블 */}
      <DataTable
        headerData={subjectHeader}
        tableItem={paginatedData}
        onClick={(subject) => {
          setSelectedSubject(subject as Subject)
          setIsModalOpen(true)
        }}
        renderMap={{
          status: renderStatus,
        }}
        isCheckBox={false}
        sortKeys={[]}
        isTime
        sortKey={null}
        sortOrder={'asc'}
        sortByKey={() => {}}
      />
      {/* 모달 */}
      <SubjectDetailModal
        subject={selectedSubject as Subject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedSubject(null)
        }}
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
export default Subjects
