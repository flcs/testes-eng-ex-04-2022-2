
import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import CreateSolicitation from '@/usecases/solicitation/createSolicitation/create-solicitation'
import CreateSolicitationController from './create-solicitation-controller'

describe('Controller - Criar Solicitação', () => {
  it('deveria criar uma solicitação corretamente', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const createSolicitationUseCase = new CreateSolicitation(inMemorySolicitationRepository)
    const sut = new CreateSolicitationController(createSolicitationUseCase)
    const request = { title: "Reparar porta", cost: 1000 }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(201)
  })

  it('deveria retornar 400 e uma mensagem do erro, se os dados não forem válidos', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const createSolicitationUseCase = new CreateSolicitation(inMemorySolicitationRepository)
    const sut = new CreateSolicitationController(createSolicitationUseCase)
    const request = { title: "", cost: 1000 }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty("message")
  })
})
