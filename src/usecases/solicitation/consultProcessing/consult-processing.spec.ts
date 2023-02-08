import { InMemorySolicitationRepository, IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'

type ConsultProcessingInput = {
  solicitationID: string
}

type ConsultProcessingOutput = {
  solicitationCalculation: number
}


class ConsultProcessing implements IUseCase<ConsultProcessingInput,ConsultProcessingOutput> {
  private repository: IRepositorySolicitation

  constructor(repository: IRepositorySolicitation) {
    this.repository = repository
  }

  perform(input: ConsultProcessingInput): Promise<ConsultProcessingOutput> {
    throw new Error('Method not implemented.')
  }
}

describe('Use Case - Consultar Processamento', () => {
  it('deveria consultar o processamento de forma correta', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '0' }
    const output = await sut.perform(input)
    expect(output.solicitationCalculation).toBe(1000)
  })
})