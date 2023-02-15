import { ResourceNotFound } from '@/controllers/errors'
import { IController, ResponseData } from '@/controllers/icontroller'
import Solicitation from '@/entities/solicitation/solicitation'
import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import ConsultProcessing from '@/usecases/solicitation/consultProcessing/consult-processing'

type ContrultProcessingRequest = {
  solicitationID: string
}

class ConsultProcessingController implements IController<ContrultProcessingRequest> {
  constructor(private readonly consultProcessingUseCase: ConsultProcessing) { }

  async handle(request: ContrultProcessingRequest): Promise<ResponseData> {
    try {
      const input = { solicitationID: request.solicitationID }
      const output = await this.consultProcessingUseCase.perform(input)
      return { statusCode: 200, body: { ...output } }
    } catch (error) {      
      if (error instanceof ResourceNotFound) {
        return { statusCode: 404, body: { message: error.message } }
      }
      return { statusCode: 500, body: { message: "Internal Error" } }
    }
  }
}

describe('Controller - Consultar Processamento', () => {

  it('deveria consultar corretamente uma solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const solicitation = new Solicitation('0','teste',new Date, 1000)
    solicitation.finishSolicitation()
    inMemorySolicitationRepository.create(solicitation)
    const consultProcessingUseCase = new ConsultProcessing(inMemorySolicitationRepository)
    const sut = new ConsultProcessingController(consultProcessingUseCase)
    const request = { solicitationID: '0' }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
  })

  it('deveria retornar 404 se solicitação não for encontrada', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const consultProcessingUseCase = new ConsultProcessing(inMemorySolicitationRepository)
    const sut = new ConsultProcessingController(consultProcessingUseCase)
    const request = { solicitationID: '50' }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(404)
  })
})