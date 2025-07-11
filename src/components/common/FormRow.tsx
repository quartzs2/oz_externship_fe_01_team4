import Label from '@components/common/Label'
import { cn } from '@utils/cn'

type FormRowProps = {
  labelText: string
  htmlFor: string
  className?: string
  labelClassName?: string
  valueClassName?: string
  children: React.ReactNode
}

const FormRow = ({
  labelText,
  htmlFor,
  className,
  labelClassName,
  valueClassName,
  children,
}: FormRowProps) => {
  return (
    <div
      className={cn(
        'inline-flex min-h-[50px] items-center border-t border-[#DDD]',
        className
      )}
    >
      <Label
        htmlFor={htmlFor}
        labelText={labelText}
        className={labelClassName}
      />
      <div className={cn('w-[530px] pl-[14px] text-[#666]', valueClassName)}>
        {children}
      </div>
    </div>
  )
}

export default FormRow
