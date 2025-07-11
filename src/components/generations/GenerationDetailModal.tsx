import Button from '@components/common/Button'
import FormRow from '@components/common/FormRow'
import Modal from '@components/common/Modal'
import type { TableRowData } from '@custom-types/table'
import {
  formatIsoToDotDateTime,
  formatIsoToKoreanDate,
} from '@utils/formatDate'

type Props = {
  isOpen: boolean
  onClose: () => void
  selectedGeneration: TableRowData | null
}

const GenerationDetailModal = ({
  isOpen,
  onClose,
  selectedGeneration,
}: Props) => {
  if (!selectedGeneration) return null

  return (
    <Modal
      modalId="generation-detail-modal"
      isOpen={isOpen}
      onClose={onClose}
      className="h-[656px] w-[940px] px-[44px] pt-[46px] pb-[30px]"
      paddingSize={30}
    >
      <h2 className="mt-4 mb-10 ml-[14px] text-lg font-semibold text-[#222]">
        기수 상세 조회
      </h2>
      <div className="mb-10 border-b-1 border-grey-300 text-sm">
        <FormRow
          labelText="ID"
          htmlFor="id"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[78px]"
        >
          {selectedGeneration?.id}
        </FormRow>
        <FormRow
          labelText="등록 일시"
          htmlFor="created_at"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[178px]"
        >
          {formatIsoToDotDateTime(
            String(selectedGeneration?.created_at),
            true,
            '-'
          )}
        </FormRow>
        <FormRow
          labelText="수정 일시"
          htmlFor="updated_at"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[176px]"
        >
          {formatIsoToDotDateTime(
            String(selectedGeneration?.updated_at),
            true,
            '-'
          )}
        </FormRow>
        <FormRow
          labelText="과정명"
          htmlFor="course_name"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {selectedGeneration?.course_name}
        </FormRow>
        <FormRow
          labelText="과정태그"
          htmlFor="course_tag"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {selectedGeneration?.course_tag}
        </FormRow>
        <FormRow
          labelText="기수"
          htmlFor="number"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {`${selectedGeneration?.number}기`}
        </FormRow>
        <FormRow
          labelText="등록인원"
          htmlFor="registered_students"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {`${selectedGeneration?.registered_students}명`}
        </FormRow>
        <FormRow
          labelText="시작일"
          htmlFor="start_date"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {formatIsoToKoreanDate(String(selectedGeneration?.start_date))}
        </FormRow>
        <FormRow
          labelText="종료일"
          htmlFor="end_date"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[281px]"
        >
          {formatIsoToKoreanDate(String(selectedGeneration?.end_date))}
        </FormRow>
        <FormRow
          labelText="상태"
          htmlFor="status"
          className="h-[48px]"
          labelClassName="w-[130px]"
          valueClassName="w-[692px]"
        >
          {selectedGeneration?.status}
        </FormRow>
        <FormRow
          labelText="과정 소개"
          htmlFor="course_description"
          className="h-[196px]"
          labelClassName="w-[130px]"
          valueClassName="w-[692px] h-full p-[14px]"
        >
          {selectedGeneration?.course_description}
        </FormRow>
      </div>
      <div className="flex justify-end gap-[6px]">
        <Button>수정</Button>
        <Button variant="VARIANT4">삭제</Button>
      </div>
    </Modal>
  )
}

export default GenerationDetailModal
