import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HiChatService {
  openHiChat: boolean = false;
  hiChatSubject = new Subject<boolean>();

  constructor() { }

  public setHiChatStatus() {
    this.openHiChat = true;
    this.hiChatSubject.next(this.openHiChat);
  }

}
