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
        'inline-block rounded-md px-2 py-1 text-xs font-semibold',
        value
          ? 'bg-[rgba(94,182,105,0.15)] text-option-green'
          : 'bg-[rgba(204,10,10,0.15)] text-option-red'
      )}
    >
      {value ? 'Activated' : 'Deactivated'}
    </span>
  )
}
