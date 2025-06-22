import { useState, useMemo } from 'react'
import type { TableRowData } from '@customType/table'

export function useSort(initialData: TableRowData[]) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return initialData
    }

    const sorted = [...initialData].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB), undefined, { numeric: true })
        : String(valB).localeCompare(String(valA), undefined, { numeric: true })
    })
    return sorted
  }, [initialData, sortKey, sortOrder])

  const sortByKey = (key: string) => {
    let newOrder: 'asc' | 'desc'

    if (sortKey === key) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newOrder = 'desc'
    }

    setSortKey(key)
    setSortOrder(newOrder)
  }

  return { sortedData, sortKey, sortOrder, sortByKey }
}
