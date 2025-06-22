import { useState, useMemo } from 'react'
import type { TableRowData } from '@customType/table'

<<<<<<< HEAD
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER]

export function useSort(initialData: TableRowData[]) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC)
=======
export function useSort(initialData: TableRowData[]) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
>>>>>>> 663903e (feat: 표(테이블) 공통 컴포넌트 구현(#16))

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return initialData
    }

    const sorted = [...initialData].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (typeof valA === 'number' && typeof valB === 'number') {
<<<<<<< HEAD
        return sortOrder === SORT_ORDER.ASC ? valA - valB : valB - valA
      }
      return sortOrder === SORT_ORDER.ASC
=======
        return sortOrder === 'asc' ? valA - valB : valB - valA
      }
      return sortOrder === 'asc'
>>>>>>> 663903e (feat: 표(테이블) 공통 컴포넌트 구현(#16))
        ? String(valA).localeCompare(String(valB), undefined, { numeric: true })
        : String(valB).localeCompare(String(valA), undefined, { numeric: true })
    })
    return sorted
  }, [initialData, sortKey, sortOrder])

  const sortByKey = (key: string) => {
<<<<<<< HEAD
    let newOrder: SortOrder

    if (sortKey === key) {
      newOrder = sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
    } else {
      newOrder = SORT_ORDER.DESC
=======
    let newOrder: 'asc' | 'desc'

    if (sortKey === key) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newOrder = 'desc'
>>>>>>> 663903e (feat: 표(테이블) 공통 컴포넌트 구현(#16))
    }

    setSortKey(key)
    setSortOrder(newOrder)
  }

  return { sortedData, sortKey, sortOrder, sortByKey }
}
