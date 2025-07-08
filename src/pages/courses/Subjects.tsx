import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'
import {
  mapSubject,
  type Subject,
  type SubjectResponse,
} from '@custom-types/subjects'
import { usePagination } from '@hooks/data-table/usePagination'
import { cn } from '@utils/cn'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'

// 페이지 상수
const COUNT_LIMIT = 20

// 테이블 헤더
const subjectHeader = [
  { text: 'ID', dataKey: 'id' },
  { text: '과목명', dataKey: 'title' },
  { text: '수강일수', dataKey: 'days' },
  { text: '시수', dataKey: 'hours' },
  { text: '과정', dataKey: 'courseName' },
  { text: '상태', dataKey: 'isActive' },
  { text: '등록 일시', dataKey: 'createdAt' },
  { text: '수정 일시', dataKey: 'updatedAt' },
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
  const res = await api.get<SubjectResponse>(ADMIN_API_PATH.SUBJECTS)
  console.log(res)
  return res.data.results.map(mapSubject)
}

// 과목 관리
const Subjects = () => {
  const [fetchData, setFetchData] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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
  const tableData: Subject[] = useMemo(() => {
    return fetchData.map((subject) => ({
      ...subject,
      statusText: subject.isActive ? 'Activated' : 'Deactivated',
    }))
  }, [fetchData])

  // 페이지네이션
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
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
        renderMap={{
          isActive: (value) => (
            <span
              className={cn(
                'inline-block rounded-md px-2 py-1 text-xs font-semibold',
                value
                  ? 'bg-option-green/15 text-option-green'
                  : 'bg-option-red/15 text-option-red'
              )}
            >
              {value ? 'Activated' : 'Deactivated'}
            </span>
          ),
        }}
        isCheckBox={false}
        sortKeys={[]}
        isTime
        sortKey={null}
        sortOrder={'asc'}
        sortByKey={() => {}}
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
