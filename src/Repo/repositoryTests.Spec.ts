import { FakeRepo, IRepository } from "./repository";

describe("Testes do repositório",()=>{
    let repository:IRepository = new FakeRepo();
    test("Repositório não conseguiu atualizar", () => {   
        expect(repository.Update(100,"")).toEqual(false);
    })
    test("Repositório não achou um funcionario ao trocar para ocupado", () => {   
        expect(repository.SetEmployeeOccupied(100,true)).toEqual(false);
    })
})