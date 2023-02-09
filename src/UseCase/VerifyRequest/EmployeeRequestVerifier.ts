import { Service, Status } from "../../Domain/Service";
import { IRepository } from "../../Repo/repository";

interface IEmployeeRequestVerifier{
    VerifyRequest(employeeID:number,serviceId:number,repository:IRepository):string
}

export class EmployeeRequestVerifier implements IEmployeeRequestVerifier{
    private repository:IRepository;
    constructor(repository:IRepository){
        this.repository = repository;
    }
    
    VerifyRequest(employeeID: number, serviceId: number): string {
        let serviceJSON:string|undefined;
        serviceJSON = this.repository.Find(serviceId);   
        if(serviceJSON == undefined) return "Service not Found";
        let service:Service = JSON.parse(serviceJSON);
        if(service.status != Status.Authorized) return "Service not Authorized or already processed";
        
        let employeeStatus = this.repository.FindEmployeeStatus(employeeID);
        if(employeeStatus == undefined) return "Employee not Found";
        if(employeeStatus == true) return "Employee is occupied, last service conclusion is pendent";

        service.employeeID = employeeID
        service.status = Status.InProgress;
        this.repository.Update(serviceId,JSON.stringify(service));
        this.repository.SetEmployeeOccupied(employeeID,true);
        return "Request set in progress by employee ID:"+employeeID;
    }
}