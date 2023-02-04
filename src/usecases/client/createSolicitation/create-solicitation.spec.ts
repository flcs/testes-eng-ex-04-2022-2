interface IRepositorySolicitation {

}

class InMemorySolicitationRepository {

}

interface IUseCase<Input, Output> {
  perform(input: Input): Promise<Output>
}

type CreateSolicitationInput = {
  title: string
}

type SolicitationStatus = 'Opened' | 'Pending'

type CreateSolicitationOutput = {
  id: string
  title: string
  createdAt: Date
  status: SolicitationStatus
}

class CreateSolicitation implements IUseCase<CreateSolicitationInput,CreateSolicitationOutput>{
  private repository: IRepositorySolicitation

  constructor(repository: IRepositorySolicitation){
    this.repository = repository
  }

  async perform(input: CreateSolicitationInput): Promise<CreateSolicitationOutput> {
    return {
      id: '0',
      title: input.title,
      createdAt: new Date(),
      status: 'Opened'
    }
  }
}

describe('Use Case - Criar Solicitação', () => {
  it('deveria criar uma solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input = {
      title: "Reparo do ar-condicionado"
    }
    const output = await sut.perform(input)
    expect(output).toHaveProperty("id")
    expect(output.title).toBe("Reparo do ar-condicionado")
  })
})