
describe('Use Case - Criar Solicitação', () => {
  it('deveria criar uma solicitação', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new CreateSolicitation(inMemorySolicitationRepository)
    const input = {
      title: "Reparo do ar-condicionado"
    }
    const output = await sut.perform(input)
    expect(output.solicitation).toHaveProperty("id")
    expect(output.solicitation.title).toBe("Reparo do ar-condicionado")
  })
})