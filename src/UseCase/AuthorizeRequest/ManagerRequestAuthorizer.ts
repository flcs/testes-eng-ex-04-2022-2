// id_requisicao e id_gerente

import { Service, Status } from "../../Domain/Service";
import { IRepository } from "../../Repo/repository";


interface IRequestAuthorizer{
    AuthorizeRequest(managerId:number,serviceId:number):string
}

export class ManagerRequestAuthorizer implements IRequestAuthorizer{
       private repository:IRepository;
    constructor(repository:IRepository){
        this.repository = repository;
    }

    AuthorizeRequest(managerId: number, serviceId: number): string {
       let serviceJSON:string|undefined;
       serviceJSON = this.repository.Find(serviceId);        
       if(serviceJSON == undefined) return "Service not Found";
       let service:Service = JSON.parse(serviceJSON);
       if(service.status != Status.Requested) return "Service not requested";
       
      
       if(!this.repository.CheckManager(managerId)) return "Manager not Found";

       service.managerID = managerId;
       service.status = Status.Authorized;
       this.repository.Update(serviceId,JSON.stringify(service));

       return "Request authorized by manager ID: "+managerId;
    }   
}


