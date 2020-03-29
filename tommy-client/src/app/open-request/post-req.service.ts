import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/environments/config.dev';

export interface PostResponse {
  "cr": {
    "@COMMON_NAME": string
  }
}


@Injectable({
  providedIn: 'root'
})

export class PostReqService {

  constructor(private http: HttpClient) { }

  requestHead = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Basic c2VydmljZWRlc2s6U0RBZG1pbjAx');


  userUUID: string;
  phoneNumber: string;
  priority: string = "505";
  urgency: string = "1102";
  userT: string;
  networkId: string;
  serviceId: string;
  descriptionCategory: string;
  descriptionInput: string;


  postRequest() {
    const description = this.appendDescriptions();
    let requestBody = {
      "cr": {
        "customer":
        {
          "@id": this.userUUID
        },
        "z_cst_phone": this.phoneNumber,
        "priority":
        {
          "@id": "505"
        },
        "Urgency":
        {
          "@id": "1102"
        },
        "z_ipaddress": "1.1.1.1",
        "z_username": this.userT,
        "z_computer_name": "computer_name",
        "z_current_loc": "customer_location",
        "z_network":
        {
          "@id": this.networkId
        },
        "z_impact_service":
        {
          "@id": this.serviceId
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
    return this.http.post(config.POST_NEW_REQUEST, requestBody,
      { headers: this.requestHead }
    );
  }


  appendDescriptions() {
    return `${this.descriptionCategory}\n${this.descriptionInput}`
  }

  getRequestId(postRes: PostResponse) {
    return postRes.cr["@COMMON_NAME"];
  }
}
