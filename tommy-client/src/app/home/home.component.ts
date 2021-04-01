import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {HiChatService} from '../hichat.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static chatDisplayFlag: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService , public hiChatService: HiChatService) { }

  ngOnInit(): void {
  }

  public chatTag() {
      document.getElementById("cloack").className = HomeComponent.chatDisplayFlag ? "hidden" : "visible";
      HomeComponent.chatDisplayFlag = !HomeComponent.chatDisplayFlag;
  }

  public getHiChat (){
    return this.hiChatService.openHiChat;
  }
}
