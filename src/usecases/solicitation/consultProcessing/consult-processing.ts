import { IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'
import ConsultProcessingInput from './consult-processing-input'
import ConsultProcessingOutput from './consult-processing-output'

class ConsultProcessing implements IUseCase<ConsultProcessingInput,ConsultProcessingOutput> {
  private repository: IRepositorySolicitation

  constructor(repository: IRepositorySolicitation) {
    this.repository = repository
  }

  async perform(input: ConsultProcessingInput): Promise<ConsultProcessingOutput> {
    if(input.solicitationID.length === 0) throw new Error("Invalid ID")
    const solicitation = await this.repository.findById(input.solicitationID)
    if(!solicitation) throw new Error("Solicitation not found")
    if(solicitation.getStatus() !== 'Finished') throw new Error("Solicitation not finished")
    const solicitationCalculationResult = solicitation.getCost()
    return {
      solicitationCalculationResult
    }
  }
}

export default ConsultProcessing