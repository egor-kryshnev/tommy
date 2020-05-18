import { Component, OnInit } from '@angular/core';
import { ApigetService } from '../apiget.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  constructor( public ApigetService: ApigetService ) { }

  iframeUrl: any;

  ngOnInit() {
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
