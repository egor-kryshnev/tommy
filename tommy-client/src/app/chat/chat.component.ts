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

  constructor(public ApigetService: ApigetService, public _eventEmmitter: EventEmiterService, private sanitizer: DomSanitizer) { }

  iframeUrl: any;

  ngOnInit() {
    this.getHichatUrl();
  }

  getHichatUrl() {
    this.ApigetService.getHichatIframe().subscribe((res: any) => {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
    });


  }

  getIframeUrl() {
    return this.iframeUrl;
  }
}