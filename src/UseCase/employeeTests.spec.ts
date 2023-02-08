import { Console } from "console";
import e from "express";
import { json } from "stream/consumers";
import { Service, Status } from "../Domain/Service";
import { EmployeeRequestProcessor } from "./EmployeeRequestProcessor"
import { FakeRepo, IRepository } from "../Repo/repository";

class ClientTestUtility{
    public static clientNames = [
        "Antônio",
        "João",
        "Maria",
        "Pedro",
        "Ana",
        "Joana",
        "Julia",
        "Diogo",
        "Iago",
        "Lara"
    ]
    public static status = [
        Status.Requested,//0
        Status.Authorized,//1
        Status.Authorized,//2
        Status.Processed,//3
        Status.Reviewed,//4
        Status.Requested,//5
        Status.Authorized,//6
        Status.Authorized,//7
        Status.Processed,//8
        Status.Reviewed,//9
    ]
}

describe("Testes no funcionario",()=>{

    //criação do repositorio e processador do funcionario
    let repository = new FakeRepo();
    let employeeProcessor = new EmployeeRequestProcessor(repository);
    //preenchimento do fakerepo
    repository.AddEmployee(0);
    repository.AddEmployee(1);
    for(let index = 0; index<10;index++){
        let newService = new Service(ClientTestUtility.clientNames[index]);
        newService.status = ClientTestUtility.status[index];
        newService.employeeID = newService.status>1?(index>4 ? 1:0):undefined;     
        repository.Add(JSON.stringify(newService));
    }

    test("teste de serviço inexistente no VerifyRequest", () => {        
        expect(employeeProcessor.VerifyRequest(1,999)).toEqual("Service not Found");
    })
    test("teste de serviço não autorizado no VerifyRequest", () => {        
        expect(employeeProcessor.VerifyRequest(1,0)).toEqual("Service not Authorized or already processed");
    })
    test("teste de funcionario não encontrado no VerifyRequest", () => {        
        expect(employeeProcessor.VerifyRequest(999,1)).toEqual("Employee not Found");
    })
    test("teste de funcionario ocupado no VerifyRequest", () => {   
        employeeProcessor.VerifyRequest(1,6);
        expect(employeeProcessor.VerifyRequest(1,7))
            .toEqual( "Employee is occupied, last service conclusion is pendent");
    })
    test("teste de VerifyRequest completo sem erro", () => {        
        expect(employeeProcessor.VerifyRequest(0,1))
            .toEqual("Request set in progress by employee ID:"+0);
    })
    test("teste de repositorio atualizado após VerifyRequest completo", () => {       
        repository.AddEmployee(5); 
        let serviceNumber = 2;
        employeeProcessor.VerifyRequest(5,serviceNumber)
        let serviceFromRepo = new Service()
        let findResult = repository.Find(serviceNumber);
        if(findResult!=undefined){
            serviceFromRepo = JSON.parse(findResult);
        }

        let expectedService = new Service()
        expectedService.clientName = ClientTestUtility.clientNames[serviceNumber];       
        expectedService.info = "";
        expectedService.managerID = undefined;
        expectedService.serviceId = serviceNumber
        expectedService.status = Status.InProgress;
        expectedService.employeeID = 5;    
        //stringify e parse é para formatar da mesma forma q é armazenada no repo
        expect(serviceFromRepo).toEqual(JSON.parse(JSON.stringify(expectedService)));
    })


    test("teste de serviço inexistente no ProcessRequest", () => {        
        expect(employeeProcessor.ProcessRequest(1,999)).toEqual("Service not Found");
    })
    test("teste de serviço fora de progresso no ProcessRequest", () => {        
        expect(employeeProcessor.ProcessRequest(1,0)).toEqual("Service not in progress");
    })
    test("teste de funcionario não encontrado no ProcessRequest", () => {        
        expect(employeeProcessor.ProcessRequest(999,1)).toEqual("Employee not Found");
    })    
    test("teste de funcionario não ocupado no ProcessRequest", () => {   
        repository.AddEmployee(6);
        expect(employeeProcessor.ProcessRequest(6,6))
            .toEqual("Employee is not busy in service ID:" + 6);
    })
    test("teste de funcionario ocupado mas não nessa tarefa no ProcessRequest", () => {   
        expect(employeeProcessor.ProcessRequest(0,6))
            .toEqual("Employee is not busy in service ID:" + 6);
    })

    test("teste de repositorio atualizado após ProcessRequest completo", () => {       
        let serviceNumber = 2;
        employeeProcessor.ProcessRequest(5,serviceNumber)
        let serviceFromRepo = new Service()
        let findResult = repository.Find(serviceNumber);
        if(findResult!=undefined){
            serviceFromRepo = JSON.parse(findResult);
        }

        let expectedService = new Service()
        expectedService.clientName = ClientTestUtility.clientNames[serviceNumber];       
        expectedService.info = "3,14159 26535 89793 23846 26433 83279 50288 41971 69399 37510 "+ 
        "58209 74944 59230 78164 06286 20899 86280 34825 34211 70679 82148 08651 32823 "+
        "06647 09384 46095 50582 23172 53594 08128 48111 74502 84102 70193 85211 05559 "+
        "64462 29489 54930 38196 44288 10975 66593 34461 28475 64823 37867 83165 27120 "+
        "19091 45648 56692 34603 48610 45432 66482 13393 60726 02491 41273 72458 70066 "+
        "06315 58817 48815 20920 96282 92540 91715 36436 78925 90360 01133 05305 48820 "+
        "46652 13841 46951 94151 16094";
        expectedService.managerID = undefined;
        expectedService.serviceId = serviceNumber
        expectedService.status = Status.Processed;
        expectedService.employeeID = 5;    
        //stringify e parse é para formatar da mesma forma q é armazenada no repo
        expect(serviceFromRepo).toEqual(JSON.parse(JSON.stringify(expectedService)));
    })


    test("Repositório não conseguiu atualizar", () => {   
        expect(repository.Update(100,"")).toEqual(false);
    })
    test("Repositório não achou um funcionario ao trocar para ocupado", () => {   
        expect(repository.SetEmployeeOccupied(100,true)).toEqual(false);
    })
})
