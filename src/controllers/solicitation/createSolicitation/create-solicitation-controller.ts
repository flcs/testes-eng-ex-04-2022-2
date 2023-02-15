import { IController, ResponseData } from '@/controllers/icontroller'
import CreateSolicitation from '@/usecases/solicitation/createSolicitation/create-solicitation'
import CreateSolicitationRequest from './create-solicitation-controller-request'
import { InvalidInputError } from '../../errors'

class CreateSolicitationController implements IController<CreateSolicitationRequest> {
  constructor(private readonly createSolictitationUseCase: CreateSolicitation) { }

  async handle(request: CreateSolicitationRequest): Promise<ResponseData> {
    try {
      const output = await this.createSolictitationUseCase.perform({
         title: request.title, cost: request.cost
      })
      return { statusCode: 201, body: { ...output } }
    } catch (error) {
      if (error instanceof InvalidInputError) {
        return { statusCode: 400, body: { message: error.message } }
      }
      return { statusCode: 500, body: { message: "Internal Error" } }
    }
  }
}

export default CreateSolicitationController