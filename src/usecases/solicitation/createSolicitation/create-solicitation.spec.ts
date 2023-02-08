import { InMemorySolicitationRepository } from '@/repositories/inMemory/inmemory-solicitation-repository'
import CreateSolicitation from './create-solicitation'

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

  it('deveria levantar uma exceção se o titúlo da solicitação estiver vazio', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input1 = { title: "" }
    await expect(sut.perform(input1)).rejects.toThrow("Invalid input")
  })
})