import AddIcon from '@assets/icons/quizzes/add-quiz-modal/add.svg?react'
import Icon from '@components/common/Icon'
import QuestionSequenceOption from '@components/quizzes/add-quiz-modal/components/sequence-view-register/QuestionSequenceOption'
import { cn } from '@utils/cn'
import { useFieldArray, useFormContext } from 'react-hook-form'

type SequenceViewRegisterProps = {
  className?: string
}

const SequenceViewRegister = ({ className }: SequenceViewRegisterProps) => {
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
    rules: {
      minLength: {
        value: 2,
        message: '보기는 최소 2개 이상 등록해야 합니다.',
      },
      maxLength: {
        value: 5,
        message: '보기는 최대 5개까지 등록할 수 있습니다.',
      },
    },
  })

  // 보기 추가 핸들러
  const handleAddOption = () => {
    if (fields.length < 5) {
      append({ text: '', order: String(fields.length + 1) })
    }
  }

  // 보기 삭제 핸들러
  const handleDeleteOption = (index: number) => {
    if (fields.length > 2) {
      remove(index)
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">
        순서 보기 등록
      </div>
      <div className="mt-[6px] text-[10px] text-[#666666]">
        <div>
          다지선다형 순서 정렬 문제 유형은 최대 5개까지 보기를 등록할 수
          있습니다.
        </div>
        <div>우측 드롭다운을 사용하여 순서를 정렬해주세요.</div>
      </div>
      <div className="relative mt-[8px] min-h-[210px] rounded-[4px] bg-[#F7F7F7] px-[12px] pt-[24px]">
        {/* 추가하기 버튼 */}
        <button
          type="button"
          onClick={handleAddOption}
          disabled={fields.length >= 5}
          className="absolute top-[-18px] right-0 flex h-[12px] cursor-pointer items-center gap-[2px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon={AddIcon} size={12} />
          <div className="text-[10px] text-[#522193]">추가하기</div>
        </button>

        {/* 보기 목록 렌더링 */}
        <div className="flex flex-col gap-y-[12px]">
          {fields.map((field, index) => (
            <QuestionSequenceOption
              key={field.id}
              index={index}
              totalOptionsCount={fields.length}
              onDelete={() => handleDeleteOption(index)}
              isDeletable={fields.length > 2}
            />
          ))}
        </div>
      </div>
      <div className="mt-[7px] text-[10px] text-[#666666]">
        * 보기는 최소 2개 이상 등록해야 합니다.
      </div>
    </div>
  )
}
export default SequenceViewRegister
