
import { Component, OnInit } from '@angular/core';
import { ApigetService, updatesModel } from '../apiget.service';

export interface Update {
  date: Date,
  text: string
}
@Component({
  selector: 'app-updating',
  templateUrl: './updating.component.html',
  styleUrls: ['./updating.component.css']
})
export class UpdatingComponent implements OnInit {

  updatesArrayFiltered: updatesModel[] = [];
  updatesArrayRes: updatesModel[] = [];
  updatesObjectRes: any;
  array: boolean = true;
  updatesObject: any;

  constructor(public apiget: ApigetService) { }

  ngOnInit() {
    this.apiget.getUpdates().subscribe((res: any) => {
      this.updatesArrayRes = res.collection_cr.cr;
      this.updatesObjectRes = res.collection_cr.cr;
      this.array = Array.isArray(this.updatesArrayRes);
      if(this.array) {
        this.updatesArrayRes.forEach((element: any) => {
          let date = new Date (element.open_date);
          this.updatesArrayFiltered.push(
            {
              "name": element.category["@COMMON_NAME"],
              "description": element.description,
              "open_date": date
            } as updatesModel
          )
        });
      }
      else {
        this.updatesObject = {
          "name": this.updatesObjectRes.category["@COMMON_NAME"],
          "description": this.updatesObjectRes.description,
          "open_date": this.updatesObjectRes.open_date
        }
      }
    });
  }

}
