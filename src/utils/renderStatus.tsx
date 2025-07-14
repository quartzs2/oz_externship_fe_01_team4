import type { TableRowData } from '@custom-types/table'
import { cn } from '@utils/cn'

export const renderStatus = (
  value: unknown,
  _rowData?: TableRowData
): React.ReactNode => {
  if (typeof value !== 'boolean') return null

  return (
    <span
      className={cn(
        'mx-auto flex h-[24px] w-[80px] items-center justify-center rounded-md text-xs font-semibold',
        value
          ? 'bg-[rgba(94,182,105,0.15)] text-option-green'
          : 'bg-[rgba(204,10,10,0.15)] text-option-red'
      )}
    >
      {value ? 'Activated' : 'Deactivated'}
    </span>
  )
}
