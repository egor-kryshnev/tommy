import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LehavaUserComponent } from '../lehava-user/lehava-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static chatDisplayFlag: Boolean;
  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog()
  }

  public chatTag() {
      document.getElementById("cloack").className = HomeComponent.chatDisplayFlag ? "hidden" : "visible";
      HomeComponent.chatDisplayFlag = !HomeComponent.chatDisplayFlag;
  }

  openDialog(){
    this.dialog.open(LehavaUserComponent, {
      height: '400px',
      width: '600px',
      disableClose: true 
    });
  }

}
