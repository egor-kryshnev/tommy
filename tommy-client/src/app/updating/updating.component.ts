import { Component, OnInit } from '@angular/core';
import { ApigetService } from '../apiget.service';

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

  updatesArrayFiltered: any;
  array: boolean = true;
  updatesObject: any;
  updatesArrayRes: any;

  // updates: Update[] = [
  //   { date: new Date(), text: "sadsadsadsad1" },
  //   { date: new Date(), text: "sadsadsadsad2" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad3" },
  //   { date: new Date(), text: "sadsadsadsad4" },
  //   { date: new Date(), text: "sadsadsadsad5" }
  // ];

  constructor(public apiget: ApigetService) { }

  ngOnInit() {
    // this.apiget.getUpdates().subscribe((res: any) => {
    //   this.updatesArrayRes = res.collection_cr.cr;
    //   this.array = Array.isArray(this.updatesArrayRes);
    //   if(this.array) {
    //     this.updatesArrayRes.forEach((element: any) => {
    //       this.updatesArrayFiltered.push(
    //         {
    //           "name": element.category["@COMMON_NAME"],
    //           "description": element.description,
    //           "open_date": element.open_date
    //         } as updatesModel
    //       )
    //     });
    //   }
    //   else {
    //     this.updatesObject = {
    //       "name": this.updatesArrayRes.category["@COMMON_NAME"],
    //       "description": this.updatesArrayRes.description,
    //       "open_date": this.updatesArrayRes.open_date
    //     }
    //     console.log(this.updatesObject);
    //   }
    // });
  }

}
