import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type {
  DeploymentResponse,
  SchedulePayload,
} from '@custom-types/createSchedule'
import type { AxiosResponse } from 'axios'

export const scheduleAPI = {
  setDeploySchedule: (
    payload: SchedulePayload
  ): Promise<AxiosResponse<DeploymentResponse>> =>
    api.post(ADMIN_API_PATH.CREATE_DEPLOYMENT, {
      test_id: payload.testId,
      generation_id: payload.generationId,
      duration_time: payload.durationTime,
      open_at: payload.openAt,
      close_at: payload.closeAt,
    }),
} as const
