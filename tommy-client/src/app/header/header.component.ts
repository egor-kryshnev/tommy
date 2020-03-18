import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(@Inject(DOCUMENT) document, private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService: AuthService) {}

  ngOnInit() {
    this.authService.login();
    this.userName = this.authService.getName();
  }

  onHome(){
    this.router.navigateByUrl('', { relativeTo: this.route });
  }


}
