import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type { SubjectResponse } from '@custom-types/subjects'

export const fetchSubjects = async (
  page: number,
  limit: number
): Promise<SubjectResponse> => {
  const res = await api.get(ADMIN_API_PATH.SUBJECTS, {
    params: { page, limit },
  })
  return res.data
}
