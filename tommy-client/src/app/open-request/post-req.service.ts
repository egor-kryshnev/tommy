import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/environments/config.dev';

export type PostResponse = PostRequestResponse | PostIncidentResponse;

interface PostRequestResponse {
  cr: {
    "@COMMON_NAME": string
  }
}

interface PostIncidentResponse {
  chg: {
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
  location: string;
  computerName: string;
  voip: string;
  public isIncident: boolean = true;

  postAppeal() {
    return this.isIncident ? this.postIncident() : this.postRequest();
  }

  postIncident() {
    const requestBody = {
      "cr": {
        "customer": {
          "@id": this.userUUID
        },
        ...this.getCommonBodyProperties()
      }
    }
    console.log(requestBody);
    return this.http.post(config.POST_NEW_INCIDENT, requestBody,
      { headers: this.requestHead, withCredentials: true }
    );
  }

  postRequest() {
    const requestBody = {
      "chg": {
        "requestor": {
          "@id": this.userUUID
        },
        ...this.getCommonBodyProperties()
      }
    }
    console.log(requestBody);
    return this.http.post(config.POST_NEW_REQUEST, requestBody,
      { headers: this.requestHead, withCredentials: true }
    );
  }

  private getCommonBodyProperties(): object {
    return {
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
      "z_computer_name": this.computerName,
      "z_current_loc": this.location,
      "z_cst_red_phone": this.voip,
      "z_network":
      {
        "@id": this.networkId
      },
      "z_impact_service":
      {
        "@id": this.serviceId
      },
      "description": this.appendDescriptions(),
      "z_source":
      {
        "@id": "400104"
      },
      "impact":
      {
        "@id": "1603"
      }
    }
  }

  appendDescriptions() {
    this.descriptionInput = (this.descriptionInput).replace(/\n/g, '');
    return `${this.descriptionCategory}\n${this.descriptionInput}`
  }

  getRequestId(postRes: PostResponse) {
    return ("cr" in postRes) ? postRes.cr["@COMMON_NAME"] : postRes.chg["@COMMON_NAME"];
  }
}
