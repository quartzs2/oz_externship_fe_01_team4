import { fetchCourses } from '@api/courses'
import type { TableRowData } from '@custom-types/table'
import { useQuery } from '@tanstack/react-query'

export const useCourses = () => {
  return useQuery<TableRowData[]>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })
}
