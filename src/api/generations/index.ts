import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type { GenerationsResponse } from '@custom-types/generations/generations'

export const fetchGenerations = async (
  page: number,
  page_size: number,
  courseId?: number
): Promise<GenerationsResponse> => {
  const actualPage = page < 1 ? 1 : page

  const params: { page: number; page_size: number; course_id?: number } = {
    page: actualPage,
    page_size,
  }

  if (courseId !== undefined) {
    params.course_id = courseId
  }

  const res = await api.get(ADMIN_API_PATH.GENERATIONS_LIST, { params })

  return res.data
}

export const fetchGenerationDetail = async (generationId: number) => {
  const res = await api.get(
    `${ADMIN_API_PATH.GENERATIONS}${generationId}/detail`
  )
  return res.data
}

export const fetchGenerationsDropdown = async (courseId: number) => {
  const res = await api.get(
    `${ADMIN_API_PATH.GENERATIONS}${courseId}/dropdown-list/`
  )
  return res.data
}
