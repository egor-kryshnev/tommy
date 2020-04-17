import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ApigetService } from './apiget.service';
import { config } from './../environments/config.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userName: string;
  public user: any;
  public userT: string;
  public userUUID: string;
  public phone: [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, public api: ApigetService) { }

  login() {
    this.http.get(`/user`).subscribe((res: any) => {
      console.log(res);
      this.user = res;
      this.userName = res.name.firstName + " " + res.name.lastName;
      this.userT = res.adfsId.split("@")[0];
      this.phone = res.phoneNumbers;
      this.api.getUUID(this.userT).subscribe((res: any) => {
        this.userUUID = res.collection_cnt.cnt['@id'];
        console.log(this.userUUID);
      });
    });
  }

  public loginSub() {
    return this.http.get(`/user`);
  }

  public getUser() {
    return this.user;
  }

  public setUser(user) {
    this.userT = user;
  }

  public setName(userName) {
    this.userName = userName;
  }

  public getName() {
    return this.userName;
  }

  public getTuser() {
    return this.userT;
  }

  public setUserShraga(user) {
    this.user = user;
  }

  public getUserShraga() {
    return this.user;
  }

  public getPhone() {
  }


}
