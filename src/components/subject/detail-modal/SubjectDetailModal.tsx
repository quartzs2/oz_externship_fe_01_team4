import Button from '@components/common/Button'
import FormRow from '@components/common/FormRow'
import Modal from '@components/common/Modal'
import type { Subject } from '@custom-types/subjects'
import { formatIsoToDotDateTime } from '@utils/formatDate'
import { renderStatus } from '@utils/renderStatus'
import { useState } from 'react'

type Props = {
  subject: Subject | null
  isOpen: boolean
  onClose: () => void
}

const SubjectDetailImage = ({ src }: { src: string }) => {
  const [isError, setIsError] = useState(true)
  if (isError || !src) {
    return (
      <div className="flex size-24 items-center justify-center rounded bg-grey-200 text-grey-400">
        No Image
      </div>
    )
  }
  return (
    <img
      src={`${src}`}
      alt="과목 로고"
      className="size-24"
      onError={() => {
        setIsError(false)
      }}
    />
  )
}

const SubjectDetailModal = ({ subject, isOpen, onClose }: Props) => {
  return (
    <Modal
      modalId="subjectDetail"
      isOpen={isOpen}
      onClose={onClose}
      paddingSize={44}
    >
      <h2 className="mb-10 text-lg font-semibold">과목 상세 정보</h2>
      {subject ? (
        <>
          <div className="flex gap-x-4 border-t border-grey-300">
            <div className="flex flex-col justify-stretch">
              <FormRow
                labelText={'과목 로고'}
                htmlFor={'thumbnail'}
                labelClassName="whitespace-nowrap h-full items-start py-4"
                valueClassName="w-fit mx-10 my-6"
              >
                <SubjectDetailImage src={`${subject.thumbnail_img_url}`} />
              </FormRow>
            </div>
            <div className="flex flex-1 flex-col">
              <FormRow
                labelText="ID"
                htmlFor="id"
                labelClassName="w-[130px] shrink-0"
                valueClassName="w-full"
              >
                {subject.id}
              </FormRow>
              <FormRow
                labelText="과목명"
                htmlFor="title"
                className="flex flex-1"
                labelClassName="items-start py-4 h-full w-[130px] shrink-0"
                valueClassName="w-full h-full flex-1 py-4"
              >
                {subject.title}
              </FormRow>
            </div>
          </div>
          <FormRow
            labelText="과정"
            htmlFor="course"
            labelClassName="min-h-[50px]"
            valueClassName="w-fit"
          >
            {subject.course_name}
          </FormRow>
          <div className="flex">
            <FormRow
              labelText="수강일수"
              htmlFor="number_of_days"
              labelClassName="min-h-[50px]"
              valueClassName="w-72"
            >
              {subject.number_of_days}
            </FormRow>
            <FormRow
              labelText="시수"
              htmlFor="number_of_hours"
              labelClassName="min-h-[50px]"
              valueClassName="w-72"
            >
              {subject.number_of_hours}
            </FormRow>
          </div>
          <FormRow
            labelText="상태"
            htmlFor="status"
            labelClassName="min-h-[50px]"
            valueClassName="w-fit"
          >
            {renderStatus(subject.status)}
          </FormRow>
          <div className="flex border-b border-[#DDD]">
            <FormRow
              labelText="등록일시"
              htmlFor="created_at"
              labelClassName="min-h-[50px]"
              valueClassName="w-72"
            >
              {formatIsoToDotDateTime(subject.created_at, true)}
            </FormRow>
            <FormRow
              labelText="수정일시"
              htmlFor="updated_at"
              labelClassName="min-h-[50px]"
              valueClassName="w-72"
            >
              {formatIsoToDotDateTime(subject.updated_at, true)}
            </FormRow>
          </div>
          <div className="flex justify-end gap-2 pt-16 pb-8">
            <Button>수정</Button>
            <Button variant="VARIANT4">삭제</Button>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </Modal>
  )
}
export default SubjectDetailModal
