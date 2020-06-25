
import { Component, OnInit } from '@angular/core';
import { ApigetService, updatesModel } from '../apiget.service';
import * as moment from "moment";


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

  updatesArray: any[];

  constructor(public apiget: ApigetService) { }

  ngOnInit() {
    this.setUpdates();
  }

  setUpdates() {
    this.apiget.getUpdates().subscribe((res: any) => {
      let Response = res.collection_cr.cr;
      if (Response) {
        this.updatesArray = [];
        if (Array.isArray(Response)) {
          Response.map((update: any) => {
            const formatted_date = moment(update.open_date * 1000).format(
              "hh:mm · DD.MM.YYYY"
            );;
            this.updatesArray.push(
              {
                "name": update.category["@COMMON_NAME"].replace(/\./g, ' ') || null,
                "description": update.summary || null,
                "open_date": formatted_date || null,
                "z_network": update.z_network ? (update.z_network["@COMMON_NAME"] || false) : false,
              }
            )
          });
        } else {
          let updateDate = new Date(Response.open_date * 1000);
            let formatted_date = updateDate.getHours() + ":" + updateDate.getMinutes() + "\xa0\xa0·\xa0\xa0" + updateDate.getDate() + "." + (updateDate.getMonth() + 1) + "." + updateDate.getFullYear();
            this.updatesArray.push(
              {
                "name": Response.category["@COMMON_NAME"].replace(/\./g, ' ') || null,
                "description": Response.summary || null,
                "open_date": formatted_date || null,
                "z_network": Response.z_network ? (Response.z_network["@COMMON_NAME"] || false) : false,
              }
            )
        }
        this.updatesArray = this.updatesArray.reverse();
      }
    });
  }

}
