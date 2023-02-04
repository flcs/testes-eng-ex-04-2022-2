import SolicitationStatus from '@/entities/solicitation/solicitation-status'

type CreateSolicitationOutput = {
  id: string
  title: string
  createdAt: Date
  status: SolicitationStatus
}

export default CreateSolicitationOutput