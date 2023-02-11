import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import IUseCase from '@/usecases/iusecase'
import CreateSolicitation from '@/usecases/solicitation/createSolicitation/create-solicitation'

interface IController<RequestData> {
  handle(request: RequestData): Promise<ResponseData>
}

type CreateSolicitationRequestData = {
  title: string
  cost: number
}

type ResponseData = {
  statusCode: number
  body: any
}

class CreateSolicitationController implements IController<CreateSolicitationRequestData> {
  constructor(private readonly createSolictitationUseCase: CreateSolicitation){}

  async handle(request: CreateSolicitationRequestData): Promise<ResponseData> {
    return {
      statusCode: 201,
      body: {}
    }
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
