import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostReqService {

  
  constructor(private http: HttpClient ) { }

  // PostHead = new HttpHeaders()
  // .set('Content-type', 'application/json')
  // .set('Accept', 'application/json')
  // .set('Authorization', 'Basic c2VydmljZWRlc2s6U0RBZG1pbjAx');

  // postObj: Object = {
  //   "cr": {
  //     "customer":
  //     {
  //       "@id": 
  //     }
  //   }
  // };

}
