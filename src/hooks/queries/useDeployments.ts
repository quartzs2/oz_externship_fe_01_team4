import { fetchDeployments } from '@api/deployments'
import type { DeploymentResponse } from '@custom-types/deployments'
import { useQuery } from '@tanstack/react-query'

export const useDeployments = () => {
  return useQuery<DeploymentResponse>({
    queryKey: ['subjects'],
    queryFn: fetchDeployments,
  })
}
