import type { PaginationProps } from '@custom-types/table'
import { useState } from 'react'

export function usePagination({ pageSize = 10 }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const totalPages = Math.ceil(totalCount / pageSize)

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(next)
  }

  return {
    currentPage,
    totalPages,
    goToPage,
    setTotalCount,
    setCurrentPage,
  }
}
