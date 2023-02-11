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
    if(!this.validate(request.title, request.cost)) {
      return {
        statusCode: 400,
        body: { message: "Invalid input" }
      }
    }
    return {
      statusCode: 201,
      body: {}
    }
  }

  private validate(title: string, cost: number): boolean {
    const isTitleLengthGreaterThanThree = title.trim().length > 3
    const titleContainsAtLeastOneLetter = Boolean(title.trim().match(/[A-z]/g))
    const isCostGreaterThanZero = cost > 0
    return isTitleLengthGreaterThanThree && titleContainsAtLeastOneLetter && isCostGreaterThanZero
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
