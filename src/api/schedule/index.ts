import api from '@api/instance/axiosInstance'
import { ADMIN_API_PATH } from '@constants/urls'
import type {
  DeploymentResponse,
  SchedulePayload,
} from '@custom-types/createSchedule'

export const scheduleAPI = {
  setDeploySchedule: (payload: SchedulePayload): Promise<DeploymentResponse> =>
    api.post(ADMIN_API_PATH.TEST_DEPLOYMENTS, {
      method: 'POST',
      data: {
        test_id: payload.testId,
        generation_id: payload.generationId,
        duration_time: payload.durationTime,
        open_at: payload.openAt,
        close_at: payload.closeAt,
      },
    }),
} as const
