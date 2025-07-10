import { ADMIN_API_PATH } from '@constants/urls'
import api from './axiosInstance'

export const fetchGenerations = async () => {
  const res = await api.get(ADMIN_API_PATH.GENERATIONS_LIST)
  return res.data.results
}

