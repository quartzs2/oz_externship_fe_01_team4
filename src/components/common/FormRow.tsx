import Label from '@components/common/Label'
import { cn } from '@utils/cn'

type FormRowProps = {
  labelText: string
  htmlFor: string
  labelClassName?: string
  valueClassName?: string
  children: React.ReactNode
}

const FormRow = ({
  labelText,
  htmlFor,
  labelClassName,
  valueClassName,
  children,
}: FormRowProps) => {
  return (
    <div className="inline-flex h-[50px] items-center border-t border-[#DDD]">
      <Label
        htmlFor={htmlFor}
        labelText={labelText}
        className={labelClassName}
      />
      <div className={cn('w-[530px] pl-[14px]', valueClassName)}>
        {children}
      </div>
    </div>
  )
}

export default FormRow
