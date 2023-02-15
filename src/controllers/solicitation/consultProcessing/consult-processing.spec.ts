import { IController, ResponseData } from '@/controllers/icontroller'
import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import ConsultProcessing from '@/usecases/solicitation/consultProcessing/consult-processing'

type ContrultProcessingRequest = {

}

class ConsultProcessingController implements IController<ContrultProcessingRequest> {
  constructor(private readonly consultProcessingUseCase: ConsultProcessing) { }

  handle(request: ContrultProcessingRequest): Promise<ResponseData> {
    throw new Error('Method not implemented.')
  }
}

describe('Controller - Consultar Processamento', () => {
  it('deveria consultar corretamente uma solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const consultProcessingUseCase = new ConsultProcessing(inMemorySolicitationRepository)
    const sut = new ConsultProcessingController(consultProcessingUseCase)
    const request = {}
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(200)
  })
})