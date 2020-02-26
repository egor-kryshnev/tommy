import { Component, OnInit } from '@angular/core';

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

  updates: Update[] = [
    { date: new Date(), text: "sadsadsadsad1" },
    { date: new Date(), text: "sadsadsadsad2" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad3" },
    { date: new Date(), text: "sadsadsadsad4" },
    { date: new Date(), text: "sadsadsadsad5" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
