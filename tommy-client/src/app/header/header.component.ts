import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ApigetService } from '../apiget.service';
import { EventEmiterService } from '../event.emmiter.service';
import { PostReqService } from '../post-req.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  userT: string;
  userUUID: string;
  constructor(@Inject(DOCUMENT) document, public apigetService: ApigetService, private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService: AuthService, public _eventEmmiter: EventEmiterService, private postReqService: PostReqService) {}

  ngOnInit() {
    this.authService.login();
    this.userName = this.authService.getName();
    this.authService.loginSub().subscribe((res: any) => {
      console.log(res);
      this.userName = res.name.firstName + " " + res.name.lastName;
      this.userT = res.adfsId.split("@")[0];
      this.authService.setUser(this.userT);
      this.authService.setUserShraga(res);
      this._eventEmmiter.sendUser(res);
      this.apigetService.getUUID(this.userT).subscribe((res: any) => {
        if(Array.isArray(res.collection_cnt.cnt)){
          this.userUUID = res.collection_cnt.cnt[1]['@id'];
        }
        else{
          this.userUUID = res.collection_cnt.cnt['@id'];
        }
        this.postReqService.userT = this.userT;
        this.postReqService.userUUID = this.userUUID;
        console.log(this.userUUID);
        this._eventEmmiter.sendMsg(this.userUUID);
      });
    });
    console.clear();
  }

  onHome(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }


}
