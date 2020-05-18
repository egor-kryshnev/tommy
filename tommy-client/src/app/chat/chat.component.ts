import { Component, OnInit } from '@angular/core';
import { ApigetService } from '../apiget.service';
import { EventEmiterService } from '../event.emmiter.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    
  constructor( public ApigetService: ApigetService, public _eventEmmitter: EventEmiterService, private sanitizer: DomSanitizer ) { }
  
  tUser: string;
  iframeUrl: any;

  ngOnInit() {
    this._eventEmmitter.tUser.subscribe(data => {
      this.tUser = data;
      console.log("User T: " + this.tUser)
      this.getHichatUrl(this.tUser);
    });
  }

  getHichatUrl(userT) {
    this.ApigetService.getHichatIframe(userT).subscribe((res: any) => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
    });


  }
}
