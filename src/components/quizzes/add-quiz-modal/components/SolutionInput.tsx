import Tiptap from '@components/common/editor/default-editor/TipTap'
import { cn } from '@utils/cn'
import { Controller, useFormContext } from 'react-hook-form'

type SolutionInputProps = {
  className?: string
}

const SolutionInput = ({ className }: SolutionInputProps) => {
  const { control } = useFormContext()

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="mb-[10px] text-[14px] font-semibold text-[#222222]">
        해설 등록
      </div>
      <Controller
        name="solution"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Tiptap value={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  )
}
export default SolutionInput
