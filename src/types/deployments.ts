export type Deployment = {
  id: number
  testTitle: string
  subjectTitle: string
  courseGeneration: string
  totalParticipants: number
  averageScore: number
  status: 'Activated' | 'Deactivated'
  createdAt: string
}

export type DeploymentResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    deployment_id: number
    test_title: string
    subject_title: string
    course_generation: string
    total_participants: number
    average_score: number
    status: 'Activated' | 'Deactivated'
    created_at: string
  }[]
}

export const mapDeployment = (
  d: DeploymentResponse['results'][number]
): Deployment => ({
  id: d.deployment_id,
  testTitle: d.test_title,
  subjectTitle: d.subject_title,
  courseGeneration: d.course_generation,
  totalParticipants: d.total_participants,
  averageScore: d.average_score,
  status: d.status,
  createdAt: d.created_at,
})
