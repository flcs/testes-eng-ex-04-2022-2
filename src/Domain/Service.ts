export enum Status {
    Requested=0,
    Authorized=1,
    InProgress=2,
    Processed=3,
    Reviewed=4
};
export class Service{
    static idCount = 0;
    serviceId:number;
    status:Status;
    clientName:string;
    managerID:number | undefined;
    employeeID:number | undefined;

    info:String;
    
    constructor(clientName?:string){
        this.status = Status.Requested;                
        this.employeeID = undefined;
        this.managerID = undefined;
        this.info = "";

        if(clientName == undefined){
            this.clientName = "";
            this.serviceId=0;
        }
        else{
            this.clientName = clientName;        
            this.serviceId = Service.idCount;
            Service.idCount++;
        }        
    }
}