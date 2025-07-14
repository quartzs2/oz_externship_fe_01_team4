import SearchIcon from '@assets/icons/search.svg?react'
import Button from '@components/common/Button'
import DataTable from '@components/common/data-table/DataTable'
import Pagination from '@components/common/data-table/Pagination'
import DropdownField from '@components/common/DropdownField'
import Icon from '@components/common/Icon'
import Modal from '@components/common/Modal'
import type { TableRowData } from '@custom-types/table'
import { useClientPagination } from '@hooks/data-table/usePagination'
import { useSort } from '@hooks/data-table/useSort'
import { useSubmissions } from '@hooks/queries/useSubmissions'
import { filterOption } from '@utils/filterOption'
import { useEffect, useMemo, useState } from 'react'
import { mapSubmission } from '../../types/submission'

// 페이지 상수 추가
const COUNT_LIMIT = 20

// 테이블 헤더
const submissionHeaders = [
  { text: 'ID', dataKey: 'id' },
  { text: '제목', dataKey: 'title' },
  { text: '과목명', dataKey: 'subject' },
  { text: '닉네임', dataKey: 'nickname' },
  { text: '이름', dataKey: 'name' },
  {
    text: '과정 | 기수',
    dataKey: 'generation',
    render: (row: { course: string; generation: number }) =>
      `${row.course} ${row.generation}기`,
  },
  { text: '부정행위 수', dataKey: 'cheating_count' },
  { text: '점수', dataKey: 'score' },
  { text: '시험 참가 일시', dataKey: 'started_at' },
  { text: '시험 종료 일시', dataKey: 'created_at' },
]

const Submissions = () => {
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 필터링 옵션 상태
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedGeneration, setSelectedGeneration] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  // React Query로 fetch
  const { data, isLoading, error } = useSubmissions()

  const tableData = useMemo(() => {
    if (!data?.data) return []
    return mapSubmission(data.data)
  }, [data])

  // 드롭다운 옵션
  const courseOptions = filterOption(
    tableData.map((d) => ({ course: d.course })),
    'course'
  )
  const generationOptions = filterOption(
    tableData.map((d) => ({ generation: d.generation })),
    'generation',
    (val) => `${val}기`
  )
  const subjectOptions = filterOption(
    tableData.map((d) => ({ subject: d.subject })),
    'subject'
  )

  // 필터링 데이터 저장
  const [filteredData, setFilteredData] = useState<TableRowData[]>(tableData)

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
    const result = tableData.filter((item) => {
      const isCourseMatch = selectedCourse
        ? item.course === selectedCourse
        : true
      const isGenMatch = selectedGeneration
        ? item.generation === selectedGeneration
        : true
      const isSubjectMatch = selectedSubject
        ? item.subject === selectedSubject
        : true
      return isCourseMatch && isGenMatch && isSubjectMatch
    })
    setFilteredData(result)
    setIsModalOpen(false)
  }

  // 필터링될때마다 동기화되도록
  useEffect(() => {
    setFilteredData(tableData)
  }, [tableData])

  if (isLoading)
    return <div className="h-full text-center text-3xl">Loading...</div>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>

  return (
    <div className="px-8 py-10">
      <h2 className="text-lg font-semibold">쪽지 시험 응시 내역 조회</h2>
      <div className="self-end">
        <Button
          variant="VARIANT7"
          className="my-3 flex items-center justify-center gap-3 whitespace-nowrap"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon icon={SearchIcon} className="w-[16px]" size={16} />
          과정별 필터링
        </Button>
      </div>
      {/* 모달 */}
      <Modal
        modalId={'filterModal'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-fit min-w-[500px] gap-2"
        paddingSize={36}
      >
        <h3 className="text-lg font-semibold">과정별 필터링</h3>
        <p className="mb-5 text-sm">
          필터를 적용할 과정과 기수를 선택해주세요.
        </p>
        {/* 필터링 드롭다운 */}
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
        <DropdownField
          label="과목"
          id="subject"
          value={selectedSubject}
          onChange={setSelectedSubject}
          options={subjectOptions}
        />
        <p className="py-5">
          현재 선택된 필터 항목은
          <span className="px-1 font-semibold text-primary-600">
            {selectedCourse} {selectedGeneration && `${selectedGeneration}기`}
            &nbsp; &gt; {selectedSubject}
          </span>
          입니다.
        </p>
        <Button
          className="self-end whitespace-nowrap"
          variant="VARIANT1"
          onClick={filterHandler}
        >
          조회
        </Button>
      </Modal>
      {/* 리스트 테이블 */}
      <DataTable
        headerData={submissionHeaders}
        tableItem={paginatedData}
        isCheckBox={false}
        sortKeys={['score', 'submittedAt']}
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
export default Submissions
