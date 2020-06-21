
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
    this.getUpdates();
  }

  getUpdates() {
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

}
