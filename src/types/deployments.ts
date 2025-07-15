export type Deployment = {
  deployment_id: number
  test_title: string
  subject_title: string
  course_generation: string
  total_participants: number
  average_score: number
  status: 'Activated' | 'Deactivated'
  created_at: string
}

export type DeploymentResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Deployment[]
}

export type DeploymentRow = {
  id: number
  test_title: string
  subject_title: string
  course_generation: string
  total_participants: number
  average_score: number
  status: 'Activated' | 'Deactivated'
  created_at: string
}

export const mapDeployment = (data: Deployment[]): DeploymentRow[] => {
  return data.map((item) => ({
    id: item.deployment_id,
    test_title: item.test_title,
    subject_title: item.subject_title,
    course_generation: item.course_generation,
    total_participants: item.total_participants,
    average_score: item.average_score,
    status: item.status,
    created_at: item.created_at,
  }))
}
