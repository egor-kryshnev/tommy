import { Component, Inject, Output, EventEmitter, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ApigetService } from '../apiget.service';
import { EventEmiterService } from '../event.emmiter.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'tommy';
  userName: string = "אדר פסקל";
  messages: any[] = [];
  openChat: boolean = false;
  userT: string;
  @Output() exampleOutput = new EventEmitter<string>();
  userUUID: string;

  constructor(@Inject(DOCUMENT) document,public apigetService: ApigetService, private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService: AuthService, public _eventEmmiter: EventEmiterService) {}

  onHome(){
    this.router.navigateByUrl('/', { relativeTo: this.route });
  }

  ngOnInit() {
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
        console.log(this.userUUID);
        this._eventEmmiter.sendMsg(this.userUUID);
      });
    });
  }

}
