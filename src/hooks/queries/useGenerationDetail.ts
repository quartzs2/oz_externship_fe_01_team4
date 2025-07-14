import { fetchGenerationDetail } from '@api/generations'
import { useQuery } from '@tanstack/react-query'

import type { GenerationDetails } from '@custom-types/generations/generations'

export const useGenerationDetail = (generationId: number | null) => {
  return useQuery<GenerationDetails>({
    queryKey: ['generationDetail', generationId],
    queryFn: () => fetchGenerationDetail(generationId as number),
    enabled: generationId !== null,
  })
}
