import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'
import CreateSolicitation from '@/usecases/solicitation/createSolicitation/create-solicitation'

interface IController<RequestData> {
  handle(request: RequestData): Promise<ResponseData>
}

type CreateSolicitationRequest = {
  title: string
  cost: number
}

type ResponseData = {
  statusCode: number
  body: any
}

class CreateSolicitationController implements IController<CreateSolicitationRequest> {
  constructor(private readonly createSolictitationUseCase: CreateSolicitation){}

  async handle(request: CreateSolicitationRequest): Promise<ResponseData> {
    throw new Error('Method not implemented.')
  }
}

describe('Controller - Criar Solicitação', () => {
  it('deveria criar uma solicitação corretamente', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const createSolicitationUseCase = new CreateSolicitation(inMemorySolicitationRepository)
    const sut = new CreateSolicitationController(createSolicitationUseCase)
    const request = { title: "Reparar porta", cost: 1000 }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(201)
  })
})
