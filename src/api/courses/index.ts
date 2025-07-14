import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
// import type { CoursesResponse } from '@custom-types/courses'

export const fetchCourses = async () => {
  const res = await api.get(ADMIN_API_PATH.COURSES)
  return res.data.results
}

// export const fetchSubjectsByCourse = async (courseId: number) => {
//   const res = await api.get(
//     `${ADMIN_API_PATH.SUBJECTS}${courseId}${ADMIN_API_PATH.COURSES_DROPDOWN}`
//   )
//   return res.data.results
// }
