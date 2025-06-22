import TableHeader from '@components/dataTable/TableHeader'
import TableRow from '@components/dataTable/TableRow'
import { useSort } from '@hooks/dataTable/useSort'
import { useSelection } from '@hooks/dataTable/useSelection'
import type { DataTableProps } from '@customType/table'

export default function DataTable({
  headerData,
  tableItem,
  isCheckBox,
  isDeploy,
  isDeploySwitch,
  isDeployStatus,
  sortKeys = [],
}: DataTableProps) {
  const { sortedData, sortKey, sortOrder, sortByKey } = useSort(tableItem)

  const { checkedItems, toggleItem, toggleAll, isAllChecked } = useSelection()

  // 빈 행 개수 계산
  const emptyCount = 10 - sortedData.length

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border border-gray-300 text-left text-sm text-gray-700">
        <TableHeader
          headers={headerData}
          isCheckBox={isCheckBox}
          sortKeys={sortKeys}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={sortByKey}
          isAllChecked={isAllChecked(sortedData.map((i) => String(i.id)))}
          onToggleAll={(e) =>
            toggleAll(
              sortedData.map((i) => String(i.id)),
              e.target.checked
            )
          }
        />
        <tbody>
          {sortedData.map((item) => (
            <TableRow
              key={item.id}
              data={item}
              headers={headerData}
              isCheckBox={isCheckBox}
              isChecked={checkedItems.has(String(item.id))}
              onToggle={(checked) => toggleItem(String(item.id), checked)}
              isDeploy={isDeploy}
              isDeploySwitch={isDeploySwitch}
              isDeployStatus={isDeployStatus}
            />
          ))}

          {/* 빈 행 */}
          {Array.from({ length: emptyCount }).map((_, idx) => (
            <tr key={`empty-${idx}`} className="h-[50px]">
              {isCheckBox && <td className="w-12 border-b border-gray-200" />}
              {headerData.map((_, colIdx) => (
                <td
                  key={colIdx}
                  className="w-[150px] border-b border-gray-200"
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
