import { InMemorySolicitationRepository, IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'

type ConsultProcessingInput = {
  solicitationID: string
}

type ConsultProcessingOutput = {
  solicitationCalculationResult: number
}


class ConsultProcessing implements IUseCase<ConsultProcessingInput,ConsultProcessingOutput> {
  private repository: IRepositorySolicitation

  constructor(repository: IRepositorySolicitation) {
    this.repository = repository
  }

  async perform(input: ConsultProcessingInput): Promise<ConsultProcessingOutput> {
    if(input.solicitationID.length === 0) throw new Error("Invalid ID")
    const solicitation = await this.repository.findById(input.solicitationID)
    return {
      solicitationCalculationResult: 1000
    }
  }
}

describe('Use Case - Consultar Processamento', () => {
  it('deveria retornar o calculo da solicitação', async () => {
    const solicitationCost = 1000
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '0' }
    const output = await sut.perform(input)
    expect(output.solicitationCalculationResult).toBe(solicitationCost)
  })

  it('deveria levantar uma exceção se o id estiver vazio ou indefinido', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '' }
    await expect(sut.perform(input)).rejects.toThrow("Invalid ID")
  })
})