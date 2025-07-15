import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type { SubmissionResponse } from '@custom-types/submission'

export const fetchSubmissions = async (): Promise<SubmissionResponse> => {
  const res = await api.get(ADMIN_API_PATH.TEST_SUBMISSIONS)
  return res.data
}
