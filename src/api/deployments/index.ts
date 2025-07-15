import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type { DeploymentResponse } from '@custom-types/deployments'

export const fetchDeployments = async (): Promise<DeploymentResponse> => {
  const res = await api.get(ADMIN_API_PATH.TEST_DEPLOYMENTS)
  return res.data
}
