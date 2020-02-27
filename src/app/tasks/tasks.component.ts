import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';


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


<<<<<<< HEAD
  selectedOpenTasks: Boolean = true;
=======
>>>>>>> 42a25054c8c6041174c1cde9f4bdc110888950e3

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

<<<<<<< HEAD
=======

>>>>>>> 42a25054c8c6041174c1cde9f4bdc110888950e3


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
  onOpenDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '1280px',
      height: '720px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickedOpenTasks() {
    if (!this.selectedOpenTasks) this.selectedOpenTasks = true;
  }

  clickedClosedTasks() {
    if (this.selectedOpenTasks) this.selectedOpenTasks = false;
  }

=======
>>>>>>> 42a25054c8c6041174c1cde9f4bdc110888950e3


}
