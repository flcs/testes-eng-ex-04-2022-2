interface IRepositoryCreate<T> {
  create(t: T): Promise<void>
}

interface IRepositoryCount<T> {
  count(): Promise<number>
}

interface IRepositorySolicitation
  extends
    IRepositoryCreate<Solicitation>,
    IRepositoryCount<Solicitation>
{}

class Solicitation {
  private id: string
  private title: string
  private createdAt: Date
  private status: SolicitationStatus

  constructor(id: string, title: string, createdAt: Date, status: SolicitationStatus) {
    this.id = id
    this.title = title
    this.createdAt = createdAt
    this.status = status
  }

  getID(): string {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getStatus(): SolicitationStatus {
    return this.status
  }
}

class InMemorySolicitationRepository implements IRepositorySolicitation{

  private solicitationList: Solicitation[] = []

  async create(solicitation: Solicitation): Promise<void> {
    await this.solicitationList.push(solicitation)
  }

  async count(): Promise<number> {
    return await this.solicitationList.length
  }
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
    const solicitationID = (await this.repository.count()).toString()
    const createdAt = new Date()
    const status: SolicitationStatus = 'Opened'
    const solicitation = new Solicitation(solicitationID, input.title, createdAt, status)
    await this.repository.create(solicitation)

    return {
      id: solicitation.getID(),
      title: solicitation.getTitle(),
      createdAt: solicitation.getCreatedAt(),
      status: solicitation.getStatus()
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

  it('deveria criar duas solicitações e retornar o ID correto para as solicitações', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "Reparo do ar-condicionado" }
    const input2 = { title: "Reparo da porta de vidro" }
    const output1 = await sut.perform(input1)
    const output2 = await sut.perform(input2)

    expect(output1.id).toBe('0')
    expect(output2.id).toBe('1')
  })
})