import { InMemorySolicitationRepository, IRepositorySolicitation } from '@/repositories/inMemory/inmemory-solicitation-repository'
import CreateSolicitation from '../createSolicitation/create-solicitation'
import CreateSolicitationInput from '../createSolicitation/create-solicitation-input'
import ConsultProcessing from './consult-processing'

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