import { useQuery } from '@tanstack/react-query'
import type { CoursesDropdown } from '@custom-types/courses'
import { fetchCourseDropdown } from '@api/courses'

export const useCoursesDropdown = () => {
  return useQuery<CoursesDropdown[]>({
    queryKey: ['coursesDropdown'],
    queryFn: () => fetchCourseDropdown(),
  })
}
