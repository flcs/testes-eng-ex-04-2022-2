import { Service, Status } from "../../Domain/Service";
import { FakeRepo } from "../../Repo/repository";
import { ManagerRequestAuthorizer } from "./ManagerRequestAuthorizer";




describe ("Testes no ManagerRequestAuthorizer", ()=>{
       let repository = new FakeRepo();
       let ManagerAuthorizer = new ManagerRequestAuthorizer(repository);

       repository.AddManager(10);
       repository.AddManager(11);
       repository.AddManager(12);
       
       // JOANA ta requested, porem sem gerente
       repository.Add(JSON.stringify(new Service("Joana")));

       //Claudio nao ta requested
       let newService = new Service("Claudio");
       newService.status = Status.Processed;
       repository.Add(JSON.stringify(newService));

       test ("servico que nao existe", ()=>{
              expect(ManagerAuthorizer.AuthorizeRequest(10,999)).toEqual("Service not Found");
       })

       test ("servico que nao esta requested, esta processed", ()=>{
              expect(ManagerAuthorizer.AuthorizeRequest(10,1)).toEqual("Service not requested");
       })

       test ("manager que nao existe", ()=>{
              expect(ManagerAuthorizer.AuthorizeRequest(100,0)).toEqual("Manager not Found");
       })

       test ("tudo tem que passar", ()=>{
              expect(ManagerAuthorizer.AuthorizeRequest(10,0)).toEqual("Request authorized by manager ID: 10");
       })

       test ("autorizou o servico", ()=>{
              let service:Service = JSON.parse(repository.Find(0) as string);
              expect(service.status).toEqual(Status.Authorized);
              expect(service.managerID).toEqual(10);
       })
    }   
)