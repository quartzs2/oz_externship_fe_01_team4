import type { TableHeader } from '@customType/table'
import { SORT_ORDER, type SortOrder } from '@hooks/dataTable/useSort'

type Props = {
  headers: TableHeader[]
  isCheckBox?: boolean
  isAllChecked: boolean
  sortKeys: string[]
  sortKey: string | null
  sortOrder: SortOrder
  onSort: (key: string) => void
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TableHeader({
  headers,
  isCheckBox,
  sortKeys,
  sortKey,
  sortOrder,
  onSort,
  isAllChecked,
  onToggleAll,
}: Props) {
  return (
    <thead className="h-[50px] bg-gray-100">
      <tr>
        {isCheckBox && (
          <th className="w-12 border-b border-gray-300 p-2 text-center">
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={onToggleAll}
            />
          </th>
        )}
        {headers.map((header) => (
          <th
            key={header.dataKey}
            className="border-b border-gray-300 p-2 text-center"
          >
            <div className="flex items-center justify-center gap-1">
              <span>{header.text}</span>
              {sortKeys.includes(header.dataKey) && (
                <button onClick={() => onSort(header.dataKey)}>
                  {sortKey === header.dataKey && sortOrder === SORT_ORDER.DESC
                    ? '▼'
                    : '▲'}
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
