import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "src/environments/config.dev";

export type PostResponse = PostRequestResponse | PostIncidentResponse;

interface PostIncidentResponse {
  in: {
    "@COMMON_NAME": string;
  };
}

interface PostRequestResponse {
  chg: {
    "@COMMON_NAME": string;
  };
}

@Injectable({
  providedIn: "root",
})
export class PostReqService {
  constructor(private http: HttpClient) {}

  requestHead = new HttpHeaders()
    .set("Content-type", "application/json")
    .set("Accept", "application/json")
    .set("Authorization", "Basic c2VydmljZWRlc2s6U0RBZG1pbjAx");
  requestWithFileHead = new HttpHeaders()
    .set("Content-type", "multipart/form-data")
    .set("Accept", "application/json")
    .set("Authorization", "Basic c2VydmljZWRlc2s6U0RBZG1pbjAx");

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
  file: { name: string; type: string; base64: Blob };
  public isIncident: boolean = true;

  postAppeal() {
    return this.isIncident ? this.postIncident() : this.postRequest();
  }

  postIncident() {
    const requestBody = {
      in: {
        customer: {
          "@id": this.userUUID,
        },
        category: {
          "@REL_ATTR": this.categoryId,
        },
        ...this.getCommonBodyProperties(),
      },
    };

    return this.http.post(config.POST_NEW_INCIDENT, requestBody, {
      headers: this.requestHead,
      withCredentials: true,
    });
  }

  postRequest() {
    const requestBody = {
      chg: {
        requestor: {
          "@id": this.userUUID,
        },
        category: {
          "@id": this.categoryId,
        },
        ...this.getCommonBodyProperties(),
      },
    };

    return this.http.post(config.POST_NEW_REQUEST, requestBody, {
      headers: this.requestHead,
      withCredentials: true,
    });
  }

  postWithFileAppeal() {
    return this.isIncident
      ? this.postWithFileIncident()
      : this.postWithFileRequest();
  }

  postWithFileIncident() {
    return this.http.post(
      `${config.POST_NEW_INCIDENT}`,
      this.getFormDataBody("in"),
      { headers: this.requestWithFileHead, withCredentials: true }
    );
  }

  postWithFileRequest() {
    return this.http.post(
      `${config.POST_NEW_REQUEST}`,
      this.getFormDataBody("chg"),
      { headers: this.requestWithFileHead, withCredentials: true }
    );
  }

  appendDescriptions() {
    this.descriptionInput = this.descriptionInput.replace(/\n/g, "");
    return `${this.descriptionCategory}\n${this.descriptionInput}`;
  }

  getRequestId(postRes: PostResponse) {
    return "in" in postRes
      ? postRes.in["@COMMON_NAME"]
      : postRes.chg["@COMMON_NAME"];
  }

  private getCommonBodyProperties(): object {
    return {
      z_cst_phone: this.phoneNumber,
      priority: {
        "@id": "505",
      },
      Urgency: {
        "@id": "1102",
      },
      z_ipaddress: "1.1.1.1",
      z_username: this.userT,
      z_computer_name: this.computerName,
      z_current_loc: this.location,
      z_cst_red_phone: this.voip,
      z_network: {
        "@id": this.networkId,
      },
      z_impact_service: {
        "@id": this.serviceId,
      },
      description: this.appendDescriptions(),
      z_source: {
        "@id": "400104",
      },
      impact: {
        "@id": "1603",
      },
    };
  }

  private getFormDataBody(postType: string): string {
    return `--*****MessageBoundary*****\r
    Content-Disposition: form-data; name="${postType}"
    Content-Type: application/xml; CHARACTERSET=UTF-8
    \r
    <${postType}>
        ${
          postType === "chg"
            ? `<requestor id="${this.userUUID}"/>
          <category id="${this.categoryId}"/>`
            : `<customer id="${this.userUUID}"/>
          <category REL_ATTR="${this.categoryId}"/>`
        }
          <z_cst_phone>${this.phoneNumber}</z_cst_phone>
          <priority id="505"/>
          <Urgency id="1102"/>
          <z_ipaddress>1.1.1.1</z_ipaddress>
          <z_username>${this.userT}</z_username>
          <z_computer_name>${this.computerName}</z_computer_name>
          <z_current_loc>${this.location}</z_current_loc>
          <z_cst_red_phone>${this.voip}</z_cst_red_phone>
          <z_network id="${this.networkId}"/>
          <z_impact_service id="${this.serviceId}"/>
          <description>${this.appendDescriptions()}</description>
          <z_source id="400104"/>
          <impact id="1603"/>
    </${postType}>
    \r
    --*****MessageBoundary*****\r
    Content-Disposition: form-data; name="${this.file.name}"; filename="${
      this.file.name
    }"
    Content-Type: application/octet-stream
    Content-Transfer-Encoding: base64
    \r
    ${this.file.base64}
    \r
    --*****MessageBoundary*****--\r
    `;
  }
}
