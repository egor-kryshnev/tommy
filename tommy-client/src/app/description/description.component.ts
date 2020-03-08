import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  services: model1[];
  userUUID: string = '';
  userPhone: any;
  userT: any;

  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public _eventEmmitter: EventEmiterService, public authService: AuthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // this.services = this.aPIgetService.getServices(id);
    this._eventEmmitter.user.subscribe(data => this.authService.setUserShraga(data));
    this._eventEmmitter.dataStr.subscribe(data => this.userUUID = data);
    // this.authService.setUserShraga(this._eventEmmitter.user);
  }

  onReturn(){
    this.router.navigateByUrl('services/' + this.route.snapshot.paramMap.get('id'), { relativeTo: this.route });
  }

  SendPost(){
    // this.userPhone = this.authService.getUserShraga().phoneNumbers;
    // this.userT = this.authService.getUserShraga().id.split("@")[0];
    // this.aPIgetService.post(this.userUUID, this.userPhone, this.userT ,  );
  }


}
