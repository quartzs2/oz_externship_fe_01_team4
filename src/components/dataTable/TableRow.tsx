import type { TableHeader, TableRowData } from '@customType/table'

type Props = {
  data: TableRowData
  headers: TableHeader[]
  isCheckBox?: boolean
  isChecked: boolean
  onToggle: (checked: boolean) => void
  isDeploy?: boolean
  isDeploySwitch?: boolean
  isDeployStatus?: boolean
}

export default function TableRow({
  data,
  headers,
  isCheckBox,
  isChecked,
  onToggle,
  isDeploy,
  isDeploySwitch,
  isDeployStatus,
}: Props) {
  return (
    <tr className="h-[50px] border-b border-gray-200 text-center hover:bg-gray-50">
      {isCheckBox && (
        <td className="w-12 p-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
          />
        </td>
      )}
      {headers.map((header, i) => (
        <td key={i} className="w-[150px] p-2">
          {(() => {
            if (header.dataKey === 'deploy' && isDeploy) {
              return (
                <button
                  className={`rounded-[5px] px-4 py-1.5 text-white ${
                    isDeployStatus ? 'bg-[#aadfb1]' : 'bg-[#5EB669]'
                  }`}
                >
                  {isDeployStatus ? '배포중' : '배포'}
                </button>
              )
            }

            if (header.dataKey === 'deploySwitch' && isDeploySwitch) {
              return (
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isDeployStatus}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#5EB669] peer-focus:ring-2 peer-focus:ring-[#5EB669] peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              )
            }
            return data[header.dataKey]
          })()}
        </td>
      ))}
    </tr>
  )
}
