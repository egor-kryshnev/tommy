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

  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService:  ApigetService, public _eventEmmitter: EventEmiterService, public authService: AuthService, public taskDetailDialog: MatDialog) { }

  ngOnInit(){
    this._eventEmmitter.dataStr.subscribe(data => {
      this._eventEmmitter.str = data;
      this.aPIgetService.getOpenTasks(data).subscribe((res: any) => {
        this.tasksArray = res.collection_cr.cr;
        this.tasksArray.forEach((element: any) =>{
          this.tasksByIdArray.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"]
            } as taskModel1
            // this.tasks = this.tasksByIdArray;
          );
        })
      });
    }
    );
    if(this._eventEmmitter.str){
      this.aPIgetService.getOpenTasks(this._eventEmmitter.str).subscribe((res: any) => {
        this.tasksArray = res.collection_cr.cr;
        this.tasksArray.forEach((element: any) =>{
          this.tasksByIdArray.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"]
            } as taskModel1
            // this.tasks = this.tasksByIdArray;
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
    this.taskDetailDialog.open(TaskDetailDialog);
  }
}
