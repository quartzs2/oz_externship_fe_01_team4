import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import SubjectDetailModal from '@components/subject/detail-modal/SubjectDetailModal'
import { type Subject } from '@custom-types/subjects'
import { useSubjects } from '@hooks/queries/useSubjects'
import { renderStatus } from '@utils/renderStatus'
import { useState, useEffect } from 'react'
import { useServerPagination } from '@hooks/data-table/usePagination'
import Button from '@components/common/Button'
import AddSubjectsModal from '@components/subject/add-subject-modal/AddSubjectModal'

// 페이지 상수
const COUNT_LIMIT = 10

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
  // 페이지네이션
  const { currentPage, totalPages, goToPage, setTotalCount } =
    useServerPagination({
      pageSize: COUNT_LIMIT,
    })

  // React Query로 fetch
  const { data, isLoading, isError, error } = useSubjects(
    currentPage,
    COUNT_LIMIT
  )

  useEffect(() => {
    if (data?.count !== undefined) {
      setTotalCount(data.count)
    }
  }, [data?.count, setTotalCount])

  // 모달 상태
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  if (isLoading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <>
      <div className="min-w-[1600px] p-[30px]">
        <h2 className="mb-5 text-lg font-semibold">과목 조회</h2>
        {/* 테이블 */}
        <DataTable
          headerData={subjectHeader}
          tableItem={data?.results ?? []}
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
        <div className="mt-[80px] flex justify-center">
          <div className="flex flex-1 justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </div>
          <Button onClick={openModal}>등록</Button>
        </div>
      </div>
      {/* 과목을 추가할 때 사용하는 모달 */}
      <AddSubjectsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}

export default Subjects
