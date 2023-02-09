import { Service, Status } from "../../Domain/Service";
import { FakeRepo } from "../../Repo/repository";
import { EmployeeRequestVerifier } from "./EmployeeRequestVerifier";

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

describe("Testes no funcionario RequestVerifier",()=>{

    //criação do repositorio e processador do funcionario
    let repository = new FakeRepo();
    let employeeVerifier = new EmployeeRequestVerifier(repository);
    
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
        expect(employeeVerifier.VerifyRequest(1,999)).toEqual("Service not Found");
    })
    test("teste de serviço não autorizado no VerifyRequest", () => {        
        expect(employeeVerifier.VerifyRequest(1,0)).toEqual("Service not Authorized or already processed");
    })
    test("teste de funcionario não encontrado no VerifyRequest", () => {        
        expect(employeeVerifier.VerifyRequest(999,1)).toEqual("Employee not Found");
    })
    test("teste de funcionario ocupado no VerifyRequest", () => {   
        employeeVerifier.VerifyRequest(1,6);
        expect(employeeVerifier.VerifyRequest(1,7))
            .toEqual( "Employee is occupied, last service conclusion is pendent");
    })
    test("teste de VerifyRequest completo sem erro", () => {        
        expect(employeeVerifier.VerifyRequest(0,1))
            .toEqual("Request set in progress by employee ID:"+0);
    })
    test("teste de repositorio atualizado após VerifyRequest completo", () => {       
        repository.AddEmployee(5); 
        let serviceNumber = 2;
        employeeVerifier.VerifyRequest(5,serviceNumber)
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
})
