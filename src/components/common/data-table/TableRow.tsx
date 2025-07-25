import type { TableHeader, TableRowData } from '@custom-types/table'
import { cn } from '@utils/cn'
import { formatIsoToDotDateTime } from '@utils/formatDate'
import { useState } from 'react'

type Props = {
  data: TableRowData
  headers: TableHeader[]
  isCheckBox?: boolean
  isChecked: boolean
  onToggle: (checked: boolean) => void
  isDeployStatus?: boolean
  isTime?: boolean
  renderMap?: {
    [key: string]: (value: unknown, rowData: TableRowData) => React.ReactNode
  }
  onClick?: (data: TableRowData) => void
}

export default function TableRow({
  data,
  headers,
  isCheckBox,
  isChecked,
  onToggle,
  isTime,
  renderMap,
  onClick,
}: Props) {
  const DATA_KEYS = {
    DEPLOY: 'deploy',
    DEPLOY_SWITCH: 'deploySwitch',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    STARTED_AT: 'started_at',
    SUBMITTED_AT: 'submittedAt',
    TYPE: 'type',
    ROLE: 'role',
    STATUS: 'status',
  } as const

  const GENERATION_STATUS = {
    READY: 'Ready',
    ONGOING: 'Ongoing',
    FINISHED: 'Finished',
  }

  const CATEGORY_TYPE = {
    LARGE: '대',
    MEDIUM: '중',
    SMALL: '소',
  } as const

  const USER_ROLE = {
    ADMIN: 'ADMIN',
    STAFF: 'STAFF',
    STUDENT: 'STUDENT',
  } as const

  const [deployStatus, setDeployStatus] = useState<boolean>(!!data.deploySwitch)

  const toggleSwitch = () => {
    setDeployStatus((prev) => !prev)
  }

  return (
    <tr
      className={cn(
        'h-[50px] cursor-pointer border-b border-[#DDDDDD] text-center hover:bg-[#F7F7F7]'
      )}
      onClick={() => onClick?.(data)}
    >
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
        <td key={i} className="w-[150px] p-2 text-[#666]">
          {(() => {
            const value = data[header.dataKey]
            // renderMap으로 커스텀 스타일 적용
            const customRender = renderMap?.[header.dataKey]
            if (customRender) return customRender(value, data)

            // 공백 대시 처리
            const isValueEmpty =
              value === undefined ||
              value === null ||
              value === '' ||
              (Array.isArray(value) && value.length === 0)

            const isNotIgnoredKey =
              header.dataKey !== DATA_KEYS.DEPLOY &&
              header.dataKey !== DATA_KEYS.DEPLOY_SWITCH

            if (isValueEmpty && isNotIgnoredKey) {
              return '-'
            }

            switch (header.dataKey) {
              case DATA_KEYS.DEPLOY_SWITCH:
                return (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={deployStatus}
                      onChange={toggleSwitch}
                      className="peer sr-only"
                    />
                    <div
                      className={cn(
                        `peer peer-checked:bg-[#5EB669] peer-focus:ring-2 peer-focus:ring-[#5EB669] peer-focus:outline-none`,
                        `peer-checked:after:translate-x-full peer-checked:after:border-[#F5F5F5]`,
                        `after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full`,
                        `after:border after:border-[#F5F5F5] after:bg-white after:transition-all after:content-['']`,
                        `h-6 w-11 rounded-full bg-[#DDDDDD]`
                      )}
                    ></div>
                  </label>
                )
              case DATA_KEYS.TYPE:
                switch (value) {
                  case CATEGORY_TYPE.LARGE:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        대분류
                      </div>
                    )
                  case CATEGORY_TYPE.MEDIUM:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        중분류
                      </div>
                    )
                  case CATEGORY_TYPE.SMALL:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        소분류
                      </div>
                    )
                  default:
                    return value
                }
              case DATA_KEYS.ROLE:
                switch (value) {
                  case USER_ROLE.ADMIN:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#522193] py-1 font-bold text-[#F7F7F7]">
                        Admin
                      </div>
                    )
                  case USER_ROLE.STUDENT:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#d7cbf7] py-1 font-bold text-[#522193]">
                        Student
                      </div>
                    )
                  case USER_ROLE.STAFF:
                    return (
                      <div className="mx-auto w-[30%] rounded-[5px] bg-[#f2effd] py-1 font-bold text-[#522193]">
                        Staff
                      </div>
                    )
                  default:
                    return value
                }
              case DATA_KEYS.STATUS:
                switch (value) {
                  case GENERATION_STATUS.READY:
                    return <p>Ready</p>
                  case GENERATION_STATUS.ONGOING:
                    return <p>Started</p>
                  case GENERATION_STATUS.FINISHED:
                    return <p>Finished</p>
                  default:
                    return value
                }
              case DATA_KEYS.CREATED_AT:
              case DATA_KEYS.UPDATED_AT:
              case DATA_KEYS.STARTED_AT:
              case DATA_KEYS.SUBMITTED_AT:
                return formatIsoToDotDateTime(String(value), isTime ?? false)
              default:
                return value
            }
          })()}
        </td>
      ))}
    </tr>
  )
}
