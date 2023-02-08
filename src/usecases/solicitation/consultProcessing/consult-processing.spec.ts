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
    if(solicitation.getStatus() !== 'Finished') throw new Error("Solicitation not finished")
    const solicitationCalculationResult = solicitation.getCost()
    return {
      solicitationCalculationResult
    }
  }
}

describe('Use Case - Consultar Processamento', () => {
  it('deveria retornar o calculo da solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const solicitationCost = 1000
    const createSolicitationInput: CreateSolicitationInput = {
      title: "Reparo jardim",
      cost: solicitationCost
    }
    const createSolicitation = new CreateSolicitation(inMemorySolicitationRepository)
    await createSolicitation.perform(createSolicitationInput)
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const consultProcessingInput = { solicitationID: '0' }
    /* ----- usecase 05 - set solicitation status to finished ----- */
    const solicitation = await inMemorySolicitationRepository.findById(consultProcessingInput.solicitationID)
    if(solicitation) solicitation.finishSolicitation()
    /* ------------------------------------------------------------ */
    const output = await sut.perform(consultProcessingInput)
    expect(output.solicitationCalculationResult).toBe(solicitationCost)
  })

  it('deveria retornar o calculo da solicitação sendo o custo 2000', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const solicitationCost = 2000
    const createSolicitationInput: CreateSolicitationInput = {
      title: "Reparo jardim",
      cost: solicitationCost
    }
    const createSolicitation = new CreateSolicitation(inMemorySolicitationRepository)
    await createSolicitation.perform(createSolicitationInput)
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const consultProcessingInput = { solicitationID: '0' }
    /* ----- usecase 05 - set solicitation status to finished ----- */
    const solicitation = await inMemorySolicitationRepository.findById(consultProcessingInput.solicitationID)
    if(solicitation) solicitation.finishSolicitation()
    /* ------------------------------------------------------------ */
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

  it('deveria levantar uma exceção se o status da solicitação não estiver finalizado', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const solicitationCost = 2000
    const createSolicitationInput: CreateSolicitationInput = {
      title: "Reparo jardim",
      cost: solicitationCost
    }
    const createSolicitation = new CreateSolicitation(inMemorySolicitationRepository)
    await createSolicitation.perform(createSolicitationInput)
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '0' }
    await expect(sut.perform(input)).rejects.toThrow("Solicitation not finished")
  })
})