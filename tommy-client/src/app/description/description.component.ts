import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, model1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';
import { PostReqService } from '../post-req.service';
import { CategoryService } from '../category/category.service';

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

  constructor(private router: Router, private route: ActivatedRoute, public _eventEmmitter: EventEmiterService, public authService: AuthService, public postReqService: PostReqService, public categoryService: CategoryService) { }

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
    this.router.navigateByUrl('services/' + this.route.snapshot.paramMap.get('id'), { relativeTo: this.route });
  }

  sendPost() {
    this.postReqService.descriptionInput = (<HTMLInputElement>document.getElementById("subject")).value;
    this.postReqService.postRequest()
      .subscribe((res: any) => {
        this.router.navigateByUrl('/', { relativeTo: this.route });
      })
    // this.userPhone = this.authService.getUserShraga().phoneNumbers;
    // this.userT = this.authService.getUserShraga().id.split("@")[0];
    // this.aPIgetService.post(this.userUUID, this.userPhone, this.userT ,  );
  }


}
