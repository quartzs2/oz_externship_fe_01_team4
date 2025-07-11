import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import SubjectDetailModal from '@components/subject/SubjectDetailModal'
import { type Subject } from '@custom-types/subjects'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { useSubjects } from '@hooks/queries/useSubjects'
import { renderStatus } from '@utils/renderStatus'
import { useState } from 'react'

// 페이지 상수
const COUNT_LIMIT = 20

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

// 과목 관리
const Subjects = () => {
  // React Query로 fetch
  const { data = [], isLoading, isError, error } = useSubjects()

  // 모달 상태
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 페이지네이션
  const { currentPage, totalPages, paginatedData, goToPage } =
    useClientPagination({
      item: data,
      count: COUNT_LIMIT,
    })

  if (isLoading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>

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
