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
    if(!this.isInputValid(input)) throw new Error("Invalid input")
    const solicitationID = (await this.repository.count()).toString()
    const createdAt = new Date()
    const solicitation = new Solicitation(solicitationID, input.title, createdAt, input.cost)
    await this.repository.create(solicitation)
    return {
      id: solicitation.getID(),
      title: solicitation.getTitle(),
      createdAt: solicitation.getCreatedAt(),
      status: solicitation.getStatus()
    }
  }

  private isInputValid(input: CreateSolicitationInput): boolean {
    const { title } = input
    const isTitleLengthGreaterThanThree = title.trim().length > 3
    const titleContainsAtLeastOneLetter = Boolean(title.trim().match(/[A-z]/g))
    return isTitleLengthGreaterThanThree && titleContainsAtLeastOneLetter
  }
}

export default CreateSolicitation