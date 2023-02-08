import { Service, Status } from "../../Domain/Service";
import { IRepository } from "../../Repo/repository";


interface IEmployeeRequestProcessor{
    ProcessRequest(employeeID:number,serviceId:number,repository:IRepository):string
}

export class EmployeeRequestProcessor implements IEmployeeRequestProcessor{
    private repository:IRepository;
    constructor(repository:IRepository){
        this.repository = repository;
    }

    ProcessRequest(employeeID: number, serviceId: number): string {
        let serviceJSON:string|undefined;
        serviceJSON = this.repository.Find(serviceId);        
        if(serviceJSON == undefined) return "Service not Found";
        let service:Service = JSON.parse(serviceJSON);
        if(service.status != Status.InProgress) return "Service not in progress";
        
        let employeeStatus = this.repository.FindEmployeeStatus(employeeID);
        if(employeeStatus == undefined) return "Employee not Found";
        if(!employeeStatus || employeeID != service.employeeID){
            return "Employee is not busy in service ID:" + serviceId;
        }          

        service.info = "3,14159 26535 89793 23846 26433 83279 50288 41971 69399 37510 "+ 
        "58209 74944 59230 78164 06286 20899 86280 34825 34211 70679 82148 08651 32823 "+
        "06647 09384 46095 50582 23172 53594 08128 48111 74502 84102 70193 85211 05559 "+
        "64462 29489 54930 38196 44288 10975 66593 34461 28475 64823 37867 83165 27120 "+
        "19091 45648 56692 34603 48610 45432 66482 13393 60726 02491 41273 72458 70066 "+
        "06315 58817 48815 20920 96282 92540 91715 36436 78925 90360 01133 05305 48820 "+
        "46652 13841 46951 94151 16094";//"calculando pi"

        service.status = Status.Processed;
        this.repository.Update(serviceId,JSON.stringify(service));
        this.repository.SetEmployeeOccupied(employeeID,false);
        return "Request processed by employee ID:"+employeeID;
    }   
}