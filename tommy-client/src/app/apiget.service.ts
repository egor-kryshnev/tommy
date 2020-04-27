import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from './../environments/config.dev';

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
  "category": string;
  "open_date": string;
  "icon": string;
}

export interface updatesModel {
  "name": string;
  "description": string;
  "open_date": string;
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
    .set('X-Obj-Attrs', 'status, summary, description, open_date');

  updatesHeaders = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('X-AccessKey', this.accessKey)
    .set('Accept', 'application/json')
    .set('X-Obj-Attrs', 'category, description, open_date');

  getNetworks() {
    this.networksByIdArray = [];
    return this.http.get(config.GET_NETWORKS_URL,
      { headers: this.head }
    );
    //console.log(this.networksByIdArray);
    //return this.networksByIdArray;
  }

  getUUID(UUID) {
    return this.http.get(config.GET_UUID_URL_FUNCTION(UUID),
      { headers: this.servicesHeaders });
  }

  getUpdates() {
    return this.http.get(config.GET_UPDATES,
      { headers: this.updatesHeaders })
  }


  getServices(id) {
    this.servicesByIdArray = [];
    return this.http.get(config.GET_SERVICES_URL_FUNCTION(id),
      { headers: this.servicesHeaders }
    );
  }



  getOpenTasks(UUID) {
    console.log("in get open tasks get");
    return this.http.get(config.GET_OPEN_TASKS_URL_FUNCTION(UUID),
      { headers: this.tasksHeaders })
  }

  getClosedTasks(UUID) {
    return this.http.get(config.GET_CLOSED_TASKS_URL_FUNCTION(UUID),
      { headers: this.tasksHeaders })
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
