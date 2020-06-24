import { Component, OnInit } from '@angular/core';
import { ApigetService } from '../apiget.service';
import { EventEmiterService } from '../event.emmiter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeComponent } from '../home/home.component'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  iframeUrl: any;
  dragPosition: object = { x: 0, y: 0 };

  constructor(public ApigetService: ApigetService, public _eventEmmitter: EventEmiterService, private sanitizer: DomSanitizer) { }

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

  closeChat() {
    document.getElementById("cloack").className = HomeComponent.chatDisplayFlag ? "hidden" : "visible";
    HomeComponent.chatDisplayFlag = !HomeComponent.chatDisplayFlag;
  }
}