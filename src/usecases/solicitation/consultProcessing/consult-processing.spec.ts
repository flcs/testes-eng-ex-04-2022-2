describe('Use Case - Consultar Processamento', () => {
  it('deveria consultar o processamento de forma correta', async () => {
    const inMemorySolicitationRepository = new InMemorySolicitationRepository()
    const sut = new ConsultProcessing(inMemorySolicitationRepository)
    const input = { solicitationID: '0' }
    const output = await sut.perform(input)
    expect(output.calculationResult).toBe(1000)
  })
})