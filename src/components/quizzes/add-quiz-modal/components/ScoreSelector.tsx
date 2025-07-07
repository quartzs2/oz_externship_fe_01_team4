import Dropdown from '@components/common/Dropdown'
import { cn } from '@utils/cn'
import { Controller, useFormContext } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type ScoreSelectorProps = {
  className?: string
}

const ScoreSelector = ({ className }: ScoreSelectorProps) => {
  const { control } = useFormContext()

  const scoreOptions = Array.from({ length: 10 }, (_, i) => {
    const value = (i + 1).toString()
    return { label: value, value }
  })

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="text-[14px] font-semibold text-[#222222]">배점 선택</div>
      <Controller
        name="score"
        control={control}
        defaultValue="1"
        render={({ field }) => {
          const handleDropdownChange = (selectedOption: Option) => {
            field.onChange(selectedOption.value)
          }

          return (
            <Dropdown
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={handleDropdownChange}
              options={scoreOptions}
              wrapClassName="w-[70px] h-[30px] mt-[12px]"
            />
          )
        }}
      />
    </div>
  )
}
export default ScoreSelector
