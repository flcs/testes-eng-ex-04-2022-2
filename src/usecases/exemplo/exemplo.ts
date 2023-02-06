export class Exemplo {
    async perform(params: Exemplo.Params): Promise<Exemplo.Result> {
        const retorno: Exemplo.Result = {
            saida: ''
        }
        return retorno
    }
}

export namespace Exemplo {
    export type Params = {
        entrada: string
    }
    export type Result = {
        saida: string
    }
}