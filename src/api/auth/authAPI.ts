import { ADMIN_API_PATH, API_BASE_URL } from '@constants/urls'
import axios from 'axios'

// API 요청 전담
export const refreshAccessToken = (refreshToken: string) => {
  return axios.post(`${API_BASE_URL}${ADMIN_API_PATH.TOKEN_REFRESH}`, {
    refresh: refreshToken,
  })
}
