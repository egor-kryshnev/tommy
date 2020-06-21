
import { Component, OnInit } from '@angular/core';
import { ApigetService, updatesModel } from '../apiget.service';


export interface Update {
  date: string,
  text: string
}
@Component({
  selector: 'app-updating',
  templateUrl: './updating.component.html',
  styleUrls: ['./updating.component.css']
})
export class UpdatingComponent implements OnInit {

  updatesArray: any[] = [];

  constructor(public apiget: ApigetService) { }

  ngOnInit() {

    this.apiget.getUpdates().subscribe((res: any) => {
      let updatesArrayResponse = res.collection_cr.cr;
      if (updatesArrayResponse) {
        updatesArrayResponse.map((element: any) => {
          let updateDate = new Date(element.open_date * 1000);
          let formatted_date = updateDate.getHours() + ":" + updateDate.getMinutes() + "\xa0\xa0·\xa0\xa0" + updateDate.getDate() + "." + (updateDate.getMonth() + 1) + "." + updateDate.getFullYear();
          this.updatesArray.push(
            {
              "name": element.category["@COMMON_NAME"].replace(/\./g, ' ') || null,
              "description": element.summary || null,
              "open_date": formatted_date || null,
              "z_network": element.z_network ? (element.z_network["@COMMON_NAME"] || false) : false,
            }
          )
        });
        this.updatesArray = this.updatesArray.reverse();
      }
    });
  }

  // this.apiget.getUpdates().subscribe((res: any) => {
  //   this.updatesArrayRes = res.collection_cr.cr;
  //   this.updatesObjectRes = res.collection_cr.cr;
  //   this.array = Array.isArray(this.updatesArrayRes) ? true : false;
  //   if (this.array) {
  //     this.updatesArrayRes.forEach((element: any) => {
  //       let current_datetime = new Date(element.open_date * 1000);
  //       let formatted_date = current_datetime.getHours() + ":" + current_datetime.getMinutes() + "\xa0\xa0·\xa0\xa0" + current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear();
  //       this.updatesArrayFiltered.push(
  //         {
  //           "name": element.category["@COMMON_NAME"].replace(/\./g, ' '),
  //           "description": element.summary,
  //           "open_date": formatted_date,
  //           "z_network": element.z_network["@COMMON_NAME"] ? element.z_network["@COMMON_NAME"] : "",
  //         }
  //       )
  //     });
  //     this.updatesArrayFiltered = this.updatesArrayFiltered.reverse();
  //   }
  //   else {
  //     this.updatesObject = {
  //       "name": this.updatesObjectRes.category["@COMMON_NAME"].replace(/\./g, ' '),
  //       "description": this.updatesObjectRes.summary,
  //       "open_date": this.updatesObjectRes.open_date,
  //       "z_network": this.updatesObjectRes.z_network["@COMMON_NAME"]
  //     }
  //   }
  // });

}
