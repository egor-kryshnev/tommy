import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';
import { PostReqService, PostResponse } from '../post-req.service';
import { CategoryService } from '../category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { FinishRequestComponent } from '../finish-request/finish-request.component'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

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

  constructor(private router: Router, private route: ActivatedRoute, public _eventEmmitter: EventEmiterService,
    public authService: AuthService, public postReqService: PostReqService, public categoryService: CategoryService,
    public dialog: MatDialog, private location: Location) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const selectedCategories = this.categoryService.getSelectedCategoryString();
    this.postReqService.descriptionCategory = selectedCategories;
    // this.services = this.aPIgetService.getServices(id);
    this._eventEmmitter.user.subscribe(data => this.authService.setUserShraga(data));
    this._eventEmmitter.dataStr.subscribe(data => this.userUUID = data);
    // this.authService.setUserShraga(this._eventEmmitter.user);
  }

  onReturn() {
    this.router.navigate(['/categories', this.postReqService.serviceId], { relativeTo: this.route });
  }

  sendPost() {
    this.postReqService.descriptionInput = (<HTMLInputElement>document.getElementById("subject")).value;
    this.postReqService.postRequest()
      .subscribe((res: PostResponse) => {
        const requestId = this.postReqService.getRequestId(res);
        console.log(`request id: ${requestId}`);
        const finishRequestDialog = this.dialog.open(FinishRequestComponent, {
          width: '430px',
          height: '466px',
          data: requestId
        });
        finishRequestDialog.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/', { relativeTo: this.route });
        });
      })
  }


}
