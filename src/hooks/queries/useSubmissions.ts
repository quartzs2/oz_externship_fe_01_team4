import { fetchSubmissions } from '@api/submissions'
import type { SubmissionResponse } from '@custom-types/submission'
import { useQuery } from '@tanstack/react-query'

export const useSubmissions = () => {
  return useQuery<SubmissionResponse>({
    queryKey: ['submission'],
    queryFn: fetchSubmissions,
  })
}
