import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, taskModel1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';
import { TaskDetailDialog } from './../task-detail/task-detail.component';

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
  tasksArray: taskModel1[] = [];
  tasksByIdArray: taskModel1[] = [];
  tasks: taskModel1[];

  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public _eventEmmitter: EventEmiterService, public authService: AuthService, public taskDetailDialog: MatDialog) { }

  ngOnInit() {
    this._eventEmmitter.dataStr.subscribe(data => {
      this._eventEmmitter.str = data;
    });
    this.getopen();
    this.getOpenInReturn(this._eventEmmitter.str);
  }



  getopen(){
    this._eventEmmitter.dataStr.subscribe(data => {
      this._eventEmmitter.str = data;
      this.aPIgetService.getOpenTasks(data).subscribe((res: any) => {
        this.tasksArray = res.collection_cr.cr;
        this.tasksArray.forEach((element: any) => {
          let current_datetime = new Date (element.open_date);
          let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear() + "\xa0\xa0·\xa0\xa0" + current_datetime.getHours() + ":" + current_datetime.getMinutes()
          this.tasksByIdArray.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"],
              "category": element.category["@COMMON_NAME"],
              "open_date": formatted_date,
            } as taskModel1
          );
        })
      });
    }
    );
  }

  getOpenInReturn(event){
    if (event) {
      this.aPIgetService.getOpenTasks(event).subscribe((res: any) => {
        this.tasksArray = res.collection_cr.cr;
        this.tasksArray.forEach((element: any) => {
          this.tasksByIdArray.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"],
              "category": element.category["@COMMON_NAME"],
              "open_date": element.open_date,
            } as taskModel1
          );
        })
      });
    }
  }





  onOpenDialog() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  clickedOpenTasks() {
    if (!this.selectedOpenTasks) this.selectedOpenTasks = true;
  }

  clickedClosedTasks() {
    if (this.selectedOpenTasks) this.selectedOpenTasks = false;
  }

  openTaskDetailDialog(task: taskModel1) {
    console.log(task);
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: task });
  }
}
