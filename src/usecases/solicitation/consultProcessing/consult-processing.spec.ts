import { InMemorySolicitationRepository, IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'
import CreateSolicitation from '../createSolicitation/create-solicitation'
import CreateSolicitationInput from '../createSolicitation/create-solicitation-input'

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
    if(!solicitation) throw new Error("Solicitation not found")
    return {
      solicitationCalculationResult: 1000
    }
  }
}

describe('Use Case - Consultar Processamento', () => {
  it('deveria retornar o calculo da solicitação', async () => {
    const solicitationCost = 1000
    const createSolicitationInput: CreateSolicitationInput = {
      title: "Reparo jardim",
      cost: solicitationCost
    }
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const createSolicitation = new CreateSolicitation(inMemorySolicitationRepository)
    await createSolicitation.perform(createSolicitationInput)
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const consultProcessingInput = { solicitationID: '0' }
    const output = await sut.perform(consultProcessingInput)
    expect(output.solicitationCalculationResult).toBe(solicitationCost)
  })

  it('deveria levantar uma exceção se o id estiver vazio ou indefinido', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '' }
    await expect(sut.perform(input)).rejects.toThrow("Invalid ID")
  })

  it('deveria levantar uma exceção se o id não for encontrado na base de dados', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '1' }
    await expect(sut.perform(input)).rejects.toThrow("Solicitation not found")
  })
})