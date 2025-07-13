import { fetchGenerations } from '@api/generations'
import type { GenerationsResponse } from '@custom-types/generations/generations'
import { useQuery } from '@tanstack/react-query'

export const useGenerations = (
  page: number,
  limit: number,
  courseId?: number
) => {
  return useQuery<GenerationsResponse>({
    queryKey: ['Generations', page, limit, courseId],
    queryFn: () => fetchGenerations(page, limit, courseId),
  })
}
