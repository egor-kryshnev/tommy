import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


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


  selectedOpenTasks: Boolean = true;

  tasks: Pnia[] = [
    {
      title: "Send File",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Change Computer",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Mouse not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "רמקולים לא עובדים",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    },
    {
      title: "Speaker not working",
      date: new Date(),
      id: 20035489612,
      time: new Date()
    }
  ]



  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  onOpenDialog() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  // onOpenDialog() {
  //   const dialogRef = this.dialog.open(NewTaskComponent, {
  //     width: '1280px',
  //     height: '720px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  clickedOpenTasks() {
    if (!this.selectedOpenTasks) this.selectedOpenTasks = true;
  }

  clickedClosedTasks() {
    if (this.selectedOpenTasks) this.selectedOpenTasks = false;
  }



}
