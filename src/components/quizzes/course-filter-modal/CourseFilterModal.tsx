import Button from '@components/common/Button'
import Dropdown from '@components/common/Dropdown'
import Label from '@components/common/Label'
import Modal from '@components/common/Modal'
import { useState } from 'react'

type CourseFilterModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  courseOptions: { label: string; value: string }[]
  setSelectedCourse: React.Dispatch<
    React.SetStateAction<{ label: string; value: string }>
  >
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const CourseFilterModal = ({
  isOpen,
  setIsOpen,
  courseOptions,
  setSelectedCourse,
  setCurrentPage,
}: CourseFilterModalProps) => {
  const [tempSelectedCourse, setTempSelectedCourse] = useState(courseOptions[0])

  const handleFilterApply = () => {
    setSelectedCourse(tempSelectedCourse)
    setCurrentPage(1)
    setIsOpen(!isOpen)
  }

  return (
    <Modal
      modalId="quizzes-course-filter-modal"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="h-[276px] w-[458px]"
      paddingSize={30}
    >
      <Label
        htmlFor="course"
        labelText="과정별 필터링"
        className="mb-[10px] h-[22px] bg-white p-0 text-[18px] font-semibold"
      />
      <p className="mb-[20px] text-[14px]">
        필터를 적용할 카테고리를 선택해주세요.
      </p>
      <Dropdown
        id="course"
        name="course"
        value={tempSelectedCourse.value}
        onChange={setTempSelectedCourse}
        options={courseOptions}
        wrapClassName="w-[360px] mb-auto"
      />
      {tempSelectedCourse.value && (
        <p className="mb-[36px] text-[14px] text-[#222]">
          현재 선택된 과정은{' '}
          <span className="font-[600] text-[#522193]">
            {tempSelectedCourse.label}
          </span>{' '}
          입니다.
        </p>
      )}
      <Button onClick={handleFilterApply} className="self-end">
        조회
      </Button>
    </Modal>
  )
}
export default CourseFilterModal
