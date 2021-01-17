import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { model1, ApigetService } from './apiget.service';
import { EventEmiterService } from './event.emmiter.service';
import { PostReqService } from './open-request/post-req.service';
import { MatDialog } from '@angular/material/dialog';
import { LehavaUserComponent } from './lehava-user/lehava-user.component';
import {SpecPlaceService} from './spec-place.service'
import { isArray } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tommy';
  userName: string;
  messages: any[] = [];
  openChat: boolean = false;
  phoneNumber: string[];
  userT: string;
  placesList: model1[] = [];
  initialPlace: model1;
  organizationUUID: string;
  try: string='hello';


  @Output() exampleOutput = new EventEmitter<string>();
  userUUID: string;

  constructor(@Inject(DOCUMENT) document, public apigetService: ApigetService, private router: Router, private route: ActivatedRoute, private http: HttpClient, public authService: AuthService, public _eventEmmiter: EventEmiterService, private postReqService: PostReqService,public dialog: MatDialog, private specPlaceService: SpecPlaceService) { }

  ngOnInit() {
    this.authService.loginSub().subscribe((res: any) => {
      console.log(res);
      this.userName = res.name.firstName + " " + res.name.lastName;
      this.userT = res.adfsId.split("@")[0];
      this.phoneNumber = res.phoneNumbers;
      this.authService.setUser(this.userT);
      this.authService.setUserShraga(res);
      res.phoneNumbers ? this._eventEmmiter.phoneSubject.next(res.phoneNumbers[0]) : this._eventEmmiter.phoneSubject.next('');
      this._eventEmmiter.sendUser(res);
      this._eventEmmiter.sendTuser(this.userT);
      // console.log(this.phoneNumber[0]);
      this._eventEmmiter.sendPhone("this.phoneNumber[0]");
      this.apigetService.getUUID(this.userT).subscribe((res: any) => {
        if(res.collection_cnt['@TOTAL_COUNT'] == '0' ){
          this.openDialog();
        }
        if (Array.isArray(res.collection_cnt.cnt)) {
          this.userUUID = res.collection_cnt.cnt[1]['@id'];
        }
        else {
          this.userUUID = res.collection_cnt.cnt['@id'];
        }
        this.authService.setUUID(this.userUUID);
        this.postReqService.userT = this.userT;
        this.postReqService.userUUID = this.userUUID;
        console.log(this.userUUID);
        this._eventEmmiter.sendMsg(this.userUUID);
      });
      this.authService.setPhone(this.phoneNumber);  
      this.updateInitialPlace();
      this.updatePlaces() 
    });
    // console.clear();
  }


  onHome() {
    this.router.navigateByUrl('/', { relativeTo: this.route });
  }

  openDialog(){
    this.dialog.open(LehavaUserComponent, {
      height: '250px',
      width: '430px',
      disableClose: true 
    });
  }

  updateInitialPlace(){
    this.apigetService.getOrganization(this.userUUID).subscribe((res: any)=>{
    this.organizationUUID = res.collection_cnt?.cnt?.organization['@id'];
    if(this.organizationUUID){
      this.apigetService.getPlace(this.organizationUUID).subscribe((res: any)=>{
        this.initialPlace = {
          id: res.collection_org.org.z_location['@id'],
          value: res.collection_org.org.z_location['@COMMON_NAME']
        }
        this.specPlaceService.setPlace(this.initialPlace); 
        console.log('user location:', this.initialPlace)
      })
    }
    });

}
  updatePlaces(){
    this.apigetService.getPlaces().subscribe((res: any) => {
      this.placesList = [];
      const placesResponse = res.collection_loc.loc;
      this.placesList = placesResponse.map((placeObject: any) => {
        return {
            "id": placeObject['@id'],
            "value": placeObject['@COMMON_NAME']
          } as model1
      });
      if(this.initialPlace){
        if(this.placesList.includes(this.initialPlace)){
          this.placesList = this.placesList.filter(place => place!== this.initialPlace);
        }
        this.placesList.unshift(this.initialPlace)
      }
      this.specPlaceService.setPlaces(this.placesList)
      this.specPlaceService.setTry(this.try); 
    });
  }


}
