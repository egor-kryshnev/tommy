import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { model1 } from '../../apiget.service';
import { AuthService } from '../../auth.service';
import { EventEmiterService } from '../../event.emmiter.service';
import { PostReqService, PostResponse } from '../post-req.service';
import { CategoryService } from '../category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { FinishRequestComponent } from '../finish-request/finish-request.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  locationWarning = "";
  phoneWarning = "";
  computerNameWarning = "";
  locationInput: string = "";
  phoneInput: string = "";
  voip: string = "";
  computerNameInput: string = "";
  services: model1[];
  userUUID: string = '';
  phoneNumbersArray: string[];
  input: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, public _eventEmmitter: EventEmiterService,
    public authService: AuthService, public postReqService: PostReqService, public categoryService: CategoryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const selectedCategories = this.categoryService.getSelectedCategoryString();
    this.postReqService.descriptionCategory = selectedCategories;
    this._eventEmmitter.user.subscribe(data => this.authService.setUserShraga(data));
    this.setPhoneFromShraga(this.authService.getPhone());
    this._eventEmmitter.dataStr.subscribe(data => this.userUUID = data);
  }

  onReturn() {
    this.router.navigate(['/categories', this.postReqService.serviceId], { relativeTo: this.route });
  }

  phoneFilter(phone: Array<string>) {
    if (phone) {
      if (phone.length > 1) {
        console.log("0" + phone[1]);
        return phone[1];
      }
      else if (phone.length === 1) {
        return phone[0];
      }
    }
    return "";
  }

  sendPost() {
    if (this.locationInput && this.phoneInput && this.computerNameInput) {
      this.postReqService.descriptionInput = (<HTMLInputElement>document.getElementById("subject")).value;
      this.postReqService.location = this.locationInput;
      console.log(this.phoneInput);
      this.postReqService.phoneNumber = this.phoneInput;
      this.postReqService.computerName = this.computerNameInput;
      this.postReqService.voip = this.voip;
      this.postReqService.postAppeal()
        .subscribe((res: PostResponse) => {
          const requestId = this.postReqService.getRequestId(res);
          console.log(`request id: ${requestId}`);
          const finishRequestDialog = this.dialog.open(FinishRequestComponent, {
            width: '430px',
            height: '466px',
            data: requestId
          });
          finishRequestDialog.afterClosed().subscribe(result => {
            this.router.navigate(['/']);
          });
        })
    } else {
      this.inputPlaceholderChanger();
    }
  }

  counter() {
    this.input = (<HTMLInputElement>document.getElementById("subject")).value.length;
  }

  setPhoneInput(phoneInput: string) {
    this.phoneInput = phoneInput;
  }

  setComputerNameInput(computerName: string) {
    this.computerNameInput = computerName;
  }

  setVOIPInput(voipInput: string) {
    this.voip = voipInput;
  }

  setLocationInput(location: string) {
    this.locationInput = location;
  }

  inputPlaceholderChanger() {
    this.locationWarning = !this.locationInput ? "red-holder" : "";
    this.phoneWarning = !this.phoneInput ? "red-holder" : "";
    this.computerNameWarning = !this.computerNameInput ? "red-holder" : "";
  }

  setPhoneFromShraga(phonesArray: string[]) {
    this.phoneInput = phonesArray.filter(this.isMobile)[0] || "";
  }

  isMobile(numStr) {
    const prefix = numStr.split("-")[0];
    return prefix.startsWith("5") || prefix.startsWith("05")
  }
}
