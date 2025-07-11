import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type { Subject } from '@custom-types/subjects'

export const fetchSubjects = async (): Promise<Subject[]> => {
  const res = await api.get(ADMIN_API_PATH.SUBJECTS)
  return res.data.results
}
