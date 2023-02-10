import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import CreateSolicitation from './create-solicitation'

describe('Use Case - Criar Solicitação', () => {
  it('deveria criar uma solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input = { title: "Reparo do ar-condicionado", cost: 1000 }
    const output = await sut.perform(input)
    expect(output).toHaveProperty("id")
    expect(output.title).toBe("Reparo do ar-condicionado")
  })

  it('deveria criar duas solicitações e retornar o ID correto para as solicitações', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "Reparo do ar-condicionado", cost: 1000 }
    const input2 = { title: "Reparo do ar-condicionado", cost: 1000 }
    const output1 = await sut.perform(input1)
    const output2 = await sut.perform(input2)
    expect(output1.id).toBe('0')
    expect(output2.id).toBe('1')
  })

  it('deveria levantar uma exceção se o título da solicitação estiver vazio', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "", cost: 1000 }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })

  it('deveria levantar uma exceção se o título da solicitação conter apenas espaços', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: " ", cost: 1000 }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })

  it('deveria levantar uma exceção se o título da solicitação não conter letras', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "12 34", cost: 1000 }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })

  it('deveria levantar uma exceção se o título da solicitação não conter pelo menos 3 letras', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "tes", cost: 1000 }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })

  it('deveria levantar uma exceção se o custo for menor ou igual a zero', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "Título válido", cost: 0 }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })
})