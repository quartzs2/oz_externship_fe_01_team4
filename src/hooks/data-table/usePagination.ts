// hooks/data-table/usePagination.ts
import { useState, useMemo } from 'react'
import type { UsePaginationProps, PaginationProps } from '@custom-types/table'

/** 클라이언트 페이지네이션 (프론트에서 자름) */
export function useClientPagination<T>({ item, count }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(item.length / count),
    [item.length, count]
  )

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * count
    return item.slice(start, start + count)
  }, [item, currentPage, count])

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(next)
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    setCurrentPage,
  }
}

/** 서버 페이지네이션 (page, pageSize를 서버에 보냄) */
export function useServerPagination({ pageSize = 10 }: PaginationProps) {
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
