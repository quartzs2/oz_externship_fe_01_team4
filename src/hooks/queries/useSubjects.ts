import { fetchSubjects } from '@api/subjects/subjectAPI'
import { useQuery } from '@tanstack/react-query'

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  })
}
