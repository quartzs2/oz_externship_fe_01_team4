import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'

export const fetchCourses = async () => {
  const res = await api.get(ADMIN_API_PATH.COURSES)
  return res.data.results
}

export const fetchCourseDropdown = async () => {
  const res = await api.get(
    `${ADMIN_API_PATH.COURSES}${ADMIN_API_PATH.DROPDOWN}`
  )
  return res.data
}
