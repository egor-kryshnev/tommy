import { Component, OnInit } from '@angular/core';
import { ApigetService } from '../apiget.service';
import { EventEmiterService } from '../event.emmiter.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor( public ApigetService: ApigetService, public _eventEmmitter: EventEmiterService ) { }

  iframeUrl: any;

  ngOnInit() {
    this._eventEmmitter.tUser.subscribe(data => {
      console.log(data);
    });
    this.getHichatUrl('aaa');
    setTimeout(() => {
      console.log(this.iframeUrl)
    }, 2000);

  }

  getHichatUrl(userT) {
    this.ApigetService.getHichatIframe(userT).subscribe((res: any) => {
      this.iframeUrl = res.url;
    });


  }
}
