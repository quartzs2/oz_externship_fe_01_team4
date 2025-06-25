import type { TableHeader, TableRowData } from '@customType/table'
import { cn } from '@utils/cn'
import { useState } from 'react'

type Props = {
  data: TableRowData
  headers: TableHeader[]
  isCheckBox?: boolean
  isChecked: boolean
  onToggle: (checked: boolean) => void
  isDeploy?: boolean
  isDeploySwitch?: boolean
  isDeployStatus?: boolean
  isTime?: boolean
}

export default function TableRow({
  data,
  headers,
  isCheckBox,
  isChecked,
  onToggle,
  isDeployStatus,
  isTime,
}: Props) {
  const [deployStatus, setDeployStatus] = useState(isDeployStatus)

  const handleDeploy = () => {
    setDeployStatus(true)
  }
  const toggleSwitch = () => {
    setDeployStatus((prev) => !prev)
  }

  const formatIsoToDotDateTime = (isoString: string) => {
    const cleaned = isoString.replace('Z', '') // 끝에 Z 제거
    const [date, time] = cleaned.split('T') // '2025-06-01', '12:00:00'
    const formattedDate = date.replace(/-/g, '.') // '2025.06.01'

    if (isTime) {
      return `${formattedDate} ${time}`
    } else {
      return `${formattedDate}`
    }
  }

  return (
    <tr className="h-[50px] border-b border-[#DDDDDD] text-center hover:bg-[#F7F7F7]">
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
            const value = data[header.dataKey]

            // 공백 대시 처리
            if (
              (value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length === 0) ||
                value === '') &&
              header.dataKey !== 'deploy' && // deploy인 경우는 무시
              header.dataKey !== 'deploySwitch' // deploySwitch인 경우도 무시
            ) {
              return '-'
            }

            switch (header.dataKey) {
              case 'deploy':
                return (
                  <button
                    className={cn(
                      'text-bold rounded-[5px] bg-[#5EB669] px-4 py-1 font-bold text-[#F7F7F7]'
                    )}
                    onClick={handleDeploy}
                  >
                    배포
                  </button>
                )
              case 'deploySwitch':
                return (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={deployStatus}
                      onChange={toggleSwitch}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-[#DDDDDD] peer-checked:bg-[#5EB669] peer-focus:ring-2 peer-focus:ring-[#5EB669] peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[#F5F5F5] after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-[#F5F5F5]"></div>
                  </label>
                )
              case 'type':
                switch (value) {
                  case '대':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        대분류
                      </div>
                    )
                  case '중':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        중분류
                      </div>
                    )
                  case '소':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        소분류
                      </div>
                    )
                  default:
                    return value
                }
              case 'role':
                switch (value) {
                  case 'ADMIN':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        Admin
                      </div>
                    )
                  case 'STUDENT':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        Student
                      </div>
                    )
                  case 'STAFF':
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        Staff
                      </div>
                    )
                  default:
                    return value
                }
              case 'created_at':
              case 'updated_at':
                return formatIsoToDotDateTime(String(value))
              default:
                return value
            }
          })()}
        </td>
      ))}
    </tr>
  )
}
