import { fetchSubjects } from '@api/subjects/subjectAPI'
import type { SubjectResponse } from '@custom-types/subjects'
import { useQuery } from '@tanstack/react-query'

export const useSubjects = (page: number, limit: number) => {
  return useQuery<SubjectResponse>({
    queryKey: ['subjects', page, limit],
    queryFn: () => fetchSubjects(page, limit),
  })
}
