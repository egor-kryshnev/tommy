import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from 'src/environments/config.dev';

export type PostResponse = PostRequestResponse | PostIncidentResponse;

interface PostIncidentResponse {
  in: {
    "@COMMON_NAME": string
  }
}

interface PostRequestResponse {
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
  requestWithFileHead = new HttpHeaders()
    .set('Content-type', 'multipart/form-data')
    .set('Accept', 'application/xml')
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
  categoryId: string;
  file: Blob;
  public isIncident: boolean = true;

  postAppeal() {
    return this.isIncident ? this.postIncident() : this.postRequest();
  }

  postIncident() {
    const requestBody = {
      "in": {
        "customer": {
          "@id": this.userUUID
        },
        "category": {
          "@REL_ATTR": this.categoryId
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
        "category": {
          "@id": this.categoryId
        },
        ...this.getCommonBodyProperties()
      }
    }
    console.log(requestBody);
    return this.http.post(config.POST_NEW_REQUEST, requestBody,
      { headers: this.requestHead, withCredentials: true }
    );
  }

  postWithFileAppeal() {
    return this.isIncident ? this.postWithFileIncident() : this.postWithFileRequest();
  }

  postWithFileIncident() {
    // const formData = new FormData();
    // formData.append('file', this.file);
    // formData.append('in', JSON.stringify({
    //   "customer": {
    //     "@id": this.userUUID
    //   },
    //   "category": {
    //     "@REL_ATTR": this.categoryId
    //   },
    //   ...this.getCommonBodyProperties()
    // }));

    return this.http.post(config.POST_NEW_INCIDENT, this.getFormDataBody('in'),
      { headers: this.requestWithFileHead, withCredentials: true }
    );
  }

  postWithFileRequest() {
    // const formData = new FormData();
    // formData.append('file', this.file);
    // formData.append('chg', JSON.stringify({
    //   "requestor": {
    //     "@id": this.userUUID
    //   },
    //   "category": {
    //     "@id": this.categoryId
    //   },
    //   ...this.getCommonBodyProperties()
    // }));

    return this.http.post(config.POST_NEW_REQUEST, this.getFormDataBody('chg'),
      { headers: this.requestWithFileHead, withCredentials: true }
    );
  }

  private getFormDataBody(postType: string): string {
    return `--*****MessageBoundary*****{{CR}}
    Content-Disposition: form-data; name="${postType}"
    Content-Type: application/xml; CHARACTER=UTF -8
    {{CR}}
    <${postType}>
        ${postType === 'chg' ?
        `<requester id="${this.userUUID}"></requester>
         <category id="${this.categoryId}"></category>` :
        `<customer id="${this.userUUID}"></customer>
         <category REL_ATTR="${this.categoryId}"></category>`}
         <z_cst_phone>${this.phoneNumber}</z_cst_phone>
         <priority id="505"></priority>
         <Urgency id="1102"></Urgency>
         <z_ipaddress>1.1.1.1</z_ipaddress>
         <z_username>${this.userT}</z_username>
         <z_computer_name>${this.computerName}</z_computer_name>
         <z_current_loc>${this.location}</z_current_loc>
         <z_cst_red_phone>${this.voip}</z_cst_red_phone>
         <z_network id="${this.networkId}"></z_network>
         <z_impact_service id="${this.serviceId}"></z_impact_service>
         <description>${this.appendDescriptions()}</description>
         <z_source id="400104"></z_source>
         <impact id="1603"></impact>
    </${postType}>
    {{CR}}
    --*****MessageBoundary*****{{CR}}
    Content-Disposition: form-data; name="file"
    Content-Type: application/octet-stream
    Content-Transfer-Encoding: base64
    {{CR}}
    ${this.file}
    {{CR}}
    --*****MessageBoundary*****{{CR}}
    `;
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
    return ("in" in postRes) ? postRes.in["@COMMON_NAME"] : postRes.chg["@COMMON_NAME"];
  }
}
