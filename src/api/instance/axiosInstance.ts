import { setInterceptors } from '@api/instance/interceptors'
import { ADMIN_API_BASE_URL } from '@constants/urls'
import axios from 'axios'

// 1. 기본 Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

setInterceptors(axiosInstance)

export default axiosInstance
