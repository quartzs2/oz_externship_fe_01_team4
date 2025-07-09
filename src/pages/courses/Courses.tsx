import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'
import type { TableRowData } from '@custom-types/table'
import { usePagination } from '@hooks/data-table/usePagination'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMTIyMTg4LCJpYXQiOjE3NTIwMzU3ODgsImp0aSI6IjUwODQ5Nzc2NmIxNzRkMTk4Yzc4YjNmN2JhMDRlOGUzIiwidXNlcl9pZCI6MTJ9.-vbrx_gHsU9XaIrtdFjjmB3Ema-IoI9dCJA2Tp98Mh0'

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

const fetchAPI = async () => {
  const res = await apiClient.get(ADMIN_API_PATH.COURSES)
  console.log(res)
  return res.data.results
}

const courseHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'name' },
  { text: '운영 기수', dataKey: 'active_generations_count' },
  { text: '수강 인원', dataKey: 'total_students_count' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
]

const Courses = () => {
  const [fetchData, setFetchData] = useState<TableRowData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await fetchAPI()
        setFetchData(courses)
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

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    item: fetchData,
    count: COUNT_LIMIT,
  })

  if (loading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="w-[1600px] p-[30px]">
      <h2 className="mb-10 text-lg font-semibold">과정 조회</h2>
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
        <Button>생성</Button>
      </div>
    </div>
  )
}
export default Courses
