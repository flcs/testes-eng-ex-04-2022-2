import Solicitation from '@/entities/solicitation/solicitation'
import SolicitationStatus from '@/entities/solicitation/solicitation-status'
import { IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'
import CreateSolicitationInput from './create-solicitation-input'
import CreateSolicitationOutput from './create-solicitation-output'

class CreateSolicitation implements IUseCase<CreateSolicitationInput,CreateSolicitationOutput>{
  private repository: IRepositorySolicitation

  constructor(repository: IRepositorySolicitation){
    this.repository = repository
  }

  async perform(input: CreateSolicitationInput): Promise<CreateSolicitationOutput> {
    const solicitationID = (await this.repository.count()).toString()
    const createdAt = new Date()
    const status: SolicitationStatus = 'Opened'
    const solicitation = new Solicitation(solicitationID, input.title, createdAt, status)
    await this.repository.create(solicitation)
    return {
      id: solicitation.getID(),
      title: solicitation.getTitle(),
      createdAt: solicitation.getCreatedAt(),
      status: solicitation.getStatus()
    }
  }
}

export default CreateSolicitation