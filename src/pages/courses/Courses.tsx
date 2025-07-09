import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import { usePagination } from '@hooks/data-table/usePagination'

// 페이지 상수 추가
const COUNT_LIMIT = 20

const courseHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '과정명', dataKey: 'name' },
  { text: '운영 기수', dataKey: 'activeGenerationCount' },
  { text: '수강 인원', dataKey: 'totalEnrollmentCount' },
  { text: '등록 일시', dataKey: 'created_at' },
  { text: '수정 일시', dataKey: 'updated_at' },
]

const courseData = [
  {
    id: 1,
    name: 'AI 백엔드 심화과정',
    tag: 'AI1',
    description: 'AI 백엔드 개발 심화 교육과정입니다.',
    thumbnail_img_url: 'https://cdn.example.com/images/ai-course.png',
    created_at: '2025-06-20T10:00:00Z',
    updated_at: '2025-06-22T11:00:00Z',
  },
  {
    id: 2,
    name: '프론트엔드 기본 과정',
    tag: 'FE1',
    description: 'HTML, CSS, JS 기본기를 학습하는 과정',
    thumbnail_img_url: 'https://cdn.example.com/images/fe-course.png',
    created_at: '2025-06-21T09:00:00Z',
    updated_at: null,
  },
]

const Courses = () => {
  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    item: courseData,
    count: COUNT_LIMIT,
  })

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
