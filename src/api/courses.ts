import { ADMIN_API_PATH } from '@constants/urls'
import api from './axiosInstance'

export const fetchCourses = async () => {
  const res = await api.get(ADMIN_API_PATH.COURSES)
  return res.data.results
}
