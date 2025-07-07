import AddIcon from '@assets/icons/quizzes/add-quiz-modal/add.svg?react'
import Icon from '@components/common/Icon'
import QuestionOption from '@components/quizzes/add-quiz-modal/components/question-options-editor/QuestionOption'
import { cn } from '@utils/cn'
import { useFieldArray, useFormContext } from 'react-hook-form'

type QuestionOptionsEditorProps = {
  className?: string
}

const QuestionOptionsEditor = ({ className }: QuestionOptionsEditorProps) => {
  const { control, register, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options', // 폼 데이터의 'options' 배열과 연결
  })

  const optionsValue = watch('options')

  // 초기 옵션 설정 (최소 1개)
  if (fields.length === 0) {
    append({ text: '', isCorrect: false })
  }

  // 보기 추가 핸들러
  const handleAddOption = () => {
    if (fields.length < 5) {
      append({ text: '', isCorrect: false })
    }
  }

  // 보기 삭제 핸들러
  const handleDeleteOption = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">
        문제 보기 등록
      </div>
      <div className="mt-[6px] text-[10px] text-[#666666]">
        <div>
          다지선다형 문제 유형은 최대 5개까지 보기를 등록할 수 있습니다.
        </div>
        <div>정답 보기는 체크박스를 체크하여 등록해주세요.</div>
      </div>
      <div className="relative mt-[8px] min-h-[210px] rounded-[4px] bg-[#F7F7F7] px-[12px] pt-[24px]">
        {/* 유효성 검사 전용 input(hidden) */}
        <input
          type="hidden"
          {...register('options_validation', {
            validate: () =>
              optionsValue?.some(
                (option: { isCorrect: boolean }) => option.isCorrect
              ) || '최소 1개 이상의 정답을 체크해야 합니다.',
          })}
        />
        {/* 추가하기 버튼 */}
        <button
          type="button"
          onClick={handleAddOption}
          disabled={fields.length >= 5} // 5개 이상이면 비활성화
          className="absolute top-[-18px] right-0 flex h-[12px] cursor-pointer items-center gap-[2px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon={AddIcon} size={12} />
          <div className="text-[10px] text-[#522193]">추가하기</div>
        </button>

        {/* 보기 목록 렌더링 */}
        <div className="flex flex-col gap-y-[12px]">
          {fields.map((field, index) => (
            <QuestionOption
              key={field.id} // useFieldArray에서 제공하는 id 사용
              option={field as { id: string; text: string; isCorrect: boolean }}
              index={index}
              onDelete={() => handleDeleteOption(index)}
              isDeletable={fields.length > 1} // 보기가 1개 초과일 때만 삭제 가능
            />
          ))}
        </div>
      </div>
      <div className="mt-[7px] text-[10px] text-[#666666]">
        * 최소 1개 이상의 정답을 체크해야합니다.
      </div>
    </div>
  )
}

export default QuestionOptionsEditor
