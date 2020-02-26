import { Component, OnInit } from '@angular/core';

export interface Pnia {
  title: string;
  date: Date;
  id: number;
  time: Date;
}



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {



  tasks: Pnia[] = [
    { title: "Send File",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "Change Computer",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "3",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "4",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "5",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "6",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "7",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "8",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "9",
      date: new Date(),
      id: 20035489612,
      time: new Date() },
    { title: "10",
      date: new Date(),
      id: 20035489612,
      time: new Date() }
  ]



  constructor() { }

  ngOnInit(): void {
  }



}
