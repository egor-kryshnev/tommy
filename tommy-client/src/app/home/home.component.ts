import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private chatDisplayFlag: Boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  chatTag() {
    document.getElementById("iframe-container").className = this.chatDisplayFlag ? "hidden" : "visible";
    this.chatDisplayFlag = !this.chatDisplayFlag;
  }

}
