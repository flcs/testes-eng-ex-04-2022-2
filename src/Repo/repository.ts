import { Service } from "@/Domain/Service";
import { Console, count } from "console";
import { arrayBuffer } from "stream/consumers";
//TODO: trocar o service para uma string json.
export interface IRepository{    
    Find(serviceId:number):string|undefined;
    Add(serviceJson:String):void;
    Update(serviceID:number,updatedJSON:string):boolean;
    AddEmployee(employeeID:number):void;
    SetEmployeeOccupied(employeeID:number,isOccupied:boolean):boolean;
    FindEmployeeStatus(employeeID:number):boolean|undefined;
    AddManager(managerID: number): void;
    CheckManager(managerID: number): boolean;
}

class fakeRepoEmployee{
    employeeID:Number;
    isOccupied:boolean;
    constructor(employeeID:number){
        this.employeeID = employeeID;
        this.isOccupied = false;
    }
}

export class FakeRepo implements IRepository{    
    
    servicesList:Array<string>;
    employeeList:Array<fakeRepoEmployee>;
    managerList:Array<Number>
    
    constructor(){
        this.servicesList = new Array<string>();
        this.employeeList = new Array<fakeRepoEmployee>;
        this.managerList = new Array<Number>;
    }

    Find(serviceID:number): string|undefined {       
        let index = -1;
        let count = 0;
        this.servicesList.forEach(s => {
            let service:Service = JSON.parse(s);
            if(service.serviceId == serviceID){
                index = count;
                return;
            }            
            count++
        });      
        if(index == -1){
            return undefined;
        } 
        else{
            return this.servicesList[index];
        }        
    }
    Add(serviceJson:string): void {
        this.servicesList.push(serviceJson);
    }

    Update(serviceID: number,updatedJSON:string): boolean {
        let index = -1;
        let count = 0;
        this.servicesList.forEach(s => {
            let service:Service = JSON.parse(s);
            if(service.serviceId == serviceID){
                index = count;
                return;
            }            
            count++
        });    
        if(index > -1){
            this.servicesList[index] = updatedJSON;
            return true
        }
        return false;
    }

    FindEmployeeStatus(employeeID: number): boolean | undefined {
        let employee = this.employeeList.find(e=>e.employeeID == employeeID);
        if(employee == undefined) return undefined;
        return employee.isOccupied;
    }
    AddEmployee(employeeID: number): void {
        let employee = new fakeRepoEmployee(employeeID)
        this.employeeList.push(employee);
    }
    SetEmployeeOccupied(employeeID: number, isOccupied: boolean): boolean {
        let employee = this.employeeList.find(e=>e.employeeID == employeeID);
        if(employee == undefined) return false;        
        employee.isOccupied = isOccupied;
        return true;
    }

    AddManager(managerID: number): void {
        this.managerList.push(managerID);
    }

    CheckManager(managerID: number): boolean {
        return (this.managerList.includes(managerID))
        
    }
}