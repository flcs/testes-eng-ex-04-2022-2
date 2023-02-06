import { Exemplo } from "@/usecases/exemplo/exemplo"

describe('UseCase Exemplo', () => {
    it('should perform the usecase and return a valid retorno', async () => {
        // Given 
        const sut = new Exemplo()
        const solicitacao: Exemplo.Params = {
            entrada: 'a processar'
        }
        const esperado: Exemplo.Result = {
            saida: 'resultado'
        }
        // When 
        const resultado = await sut.perform(solicitacao)
        // Then 
        expect(resultado).toEqual(esperado)
    })
})