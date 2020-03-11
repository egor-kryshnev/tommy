import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './../environments/config.private.prod';

interface model {
  "@id": string;
  "@COMMON_NAME": string;
}

interface taskModel {
  "@id": string;
  "description": string;
}

export interface UUID1 {
  "id": string;
}

export interface model1 {
  "id": string;
  "value": string;
}

export interface taskModel1 {
  "id": string;
  "description": string;
  "status": string;
}

@Injectable({
  providedIn: 'root'
})
export class ApigetService {

  accessKey: string = '59975677';
  userT: string;
  networksArray: model[];
  networksByIdArray: model1[] = [];
  servicesArray: model[];
  servicesByIdArray: model1[] = [];
  tasksArray: taskModel[];
  tasksByIdArray: taskModel1[];
  userUUID: string;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-AccessKey': this.accessKey,
      'Accept': 'application/json'
    })
  }

  PostHead = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Basic c2VydmljZWRlc2s6U0RBZG1pbjAx');

  head = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('X-AccessKey', this.accessKey)
    .set('Accept', 'application/json');

  servicesHeaders = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('X-AccessKey', this.accessKey)
    .set('Accept', 'application/json')
    .set('X-Obj-Attrs', 'service')

  tasksHeaders = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('X-AccessKey', this.accessKey)
    .set('Accept', 'application/json')
    .set('X-Obj-Attrs', 'status, summary, description')

  getNetworks() {
    this.networksByIdArray = [];
    this.http.get(config.GET_NETWORKS_URL,
      { headers: this.head }
    ).subscribe((res: any) => {
      this.networksArray = res.collection_nr.nr;
      console.log(this.networksArray);
      this.networksArray.forEach((networkObject: any) => {
        this.networksByIdArray.push(
          {
            "id": networkObject["@id"],
            "value": networkObject["@COMMON_NAME"]
          } as model1
        );
      })
    });
    console.log(this.networksByIdArray);
    return this.networksByIdArray;
  }

  getUUID(UUID) {
    // this.http.get("" ,
    return this.http.get(config.GET_UUID_URL_FUNCTION(UUID),
      { headers: this.servicesHeaders })
    // .subscribe((res: any) => {
    //   if(Array.isArray(res.collection_cnt.cnt)){
    //     console.log(res.collection_cnt.cnt[0]['@id'])
    //     this.userUUID = res.collection_cnt.cnt[0]['@id'];
    //     // console.log(this.userUUID);
    //   }
    //   else{
    //     // console.log('nabet')
    //     // console.log('ron')
    //     // console.log(res.collection_cnt.cnt['@id'])
    //     this.userUUID = res.collection_cnt.cnt['@id'];
    //   }
    //   this.getOpenTasks(this.userUUID);
    //  });
  }


  getServices(id) {
    this.servicesByIdArray = [];
    this.http.get(config.GET_SERVICES_URL_FUNCTION(id),
      { headers: this.servicesHeaders }
    ).subscribe((res: any) => {
      this.servicesArray = res.collection_z_networks_to_service.z_networks_to_service;
      this.servicesArray.forEach((element: any) => {
        const serviceObject = element.service;
        this.servicesByIdArray.push(
          {
            "id": serviceObject["@id"],
            "value": serviceObject["@COMMON_NAME"],
          } as model1
        );
      })
    });
    return this.servicesByIdArray;
  }

  // getTasks(){
  //   this.tasksByIdArray = [];
  //   // this.getOpenTasks(this.getUUID());
  //   this.getClosedTasks();
  //   return this.tasksByIdArray;
  // }

  getOpenTasks(UUID) {
    // console.log("");
    return this.http.get(config.GET_OPEN_TASKS_URL_FUNCTION(UUID),
      // return this.http.get("",
      // return this.http.get("",
      { headers: this.tasksHeaders })
    // .subscribe((res: any) => { 
    //   this.tasksArray = res.collection_cr.cr;
    //   this.tasksArray.forEach((element: any) =>{
    //     this.tasksByIdArray.push(
    //       {
    //         "id": element["@COMMON_NAME"],
    //         "description": element.description,
    //         "status": element.status["@COMMON_NAME"]
    //       } as taskModel1
    //     );
    //   })
    // });
  }

  getClosedTasks(id) {
    this.http.get(config.GET_CLOSED_TASKS_URL_FUNCTION(id),
      { headers: this.tasksHeaders }
    ).subscribe((res: any) => {
      this.tasksArray = res.collection_cr.cr;
      this.tasksArray.forEach((element: any) => {
        this.tasksByIdArray.push(
          {
            "id": element["@COMMON_NAME"],
            "description": element.description,
            "status": element.status["@COMMON_NAME"]
          } as taskModel1
        );
      })
    });
  }

  post(uuid, phone, userT, network, service, description) {
    let json = {
      "cr": {
        "customer":
        {
          "@id": uuid
        },
        "z_cst_phone": phone,
        "priority":
        {
          "@id": "505"
        },
        "Urgency":
        {
          "@id": "1102"
        },
        "z_ipaddress": "1.1.1.1",
        "z_username": userT,
        "z_computer_name": "computer_name",
        "z_current_loc": "customer_location",
        "z_network":
        {
          "@id": network
        },
        "z_impact_service":
        {
          "@id": service
        },
        "description": description,
        "z_source":
        {
          "@id": "400104"
        },
        "impact":
        {
          "@id": "1603"
        },
      }
    }
  }
};
