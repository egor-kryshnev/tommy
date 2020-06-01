import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, taskModel1, model1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';
import { TaskDetailDialog } from './../task-detail/task-detail.component';
import * as moment from 'moment';

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

  openTasksArr: taskModel1[] = [];
  closedTasksArr: taskModel1[] = [];
  displayedTasks: taskModel1[] = [];
  openTasksFlag: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public _eventEmmitter: EventEmiterService, public authService: AuthService, public taskDetailDialog: MatDialog) { }

  ngOnInit() {
    this._eventEmmitter.dataStr.subscribe(data => {
      this._eventEmmitter.str = data;
      this.getOpenTasksArr();
      this.getClosedTasksArr();
      this.setDisplayedTasks();
    });
  }

  getOpenTasksArr() {
    this.aPIgetService.getOpenTasks(this._eventEmmitter.str).subscribe((res: any) => {
      if (Array.isArray(res.collection_cr.cr)) {
        this.openTasksArr = res.collection_cr.cr;
      } else {
        this.openTasksArr[0] = res.collection_cr.cr;
      }
      this.openTasksArr = this.arrParser(this.openTasksArr);
    });
  }

  getClosedTasksArr() {
    this.aPIgetService.getClosedTasks(this._eventEmmitter.str).subscribe((res: any) => {
      if (Array.isArray(res.collection_cr.cr)) {
        this.closedTasksArr = res.collection_cr.cr;
      } else {
        this.closedTasksArr[0] = res.collection_cr.cr;
      }
      this.closedTasksArr = this.arrParser(this.closedTasksArr);
    });
  }

  jsonParser(taskObject) {
    const formatted_date = moment(taskObject.open_date * 1000).format('hh:mm DD.MM.YYYY');
    return {
      "id": taskObject["@COMMON_NAME"],
      "description": taskObject.description,
      "status": taskObject.status["@COMMON_NAME"],
      "open_date": formatted_date,
      "network": taskObject.z_network["@COMMON_NAME"],
      "service": taskObject.z_impact_service["@COMMON_NAME"],
      "summary": taskObject.summary,
      // "group": taskObject.group["@COMMON_NAME"],
      "icon": `../../assets/status${taskObject.status["@id"]}.png`
    }
  }

  arrParser(tasksArray) {
    return tasksArray.map((element) => this.jsonParser(element));
  }

  setDisplayedTasks() {
    this.displayedTasks = this.openTasksFlag ? this.openTasksArr : this.closedTasksArr;
  }

  openRequest() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  flipOpenTasksFlag() {
    this.openTasksFlag = !this.openTasksFlag;
    this.setDisplayedTasks();
  }

  // clickedOpenTasks() {
  //   if (!this.open) {
  //     this.open = true;
  //     this.tasksToDisplay = this.tasksByIdArray;
  //     this.searchTextChanged(this.searchText);
  //     if (!this.selectedOpenTasks) this.selectedOpenTasks = true;
  //   }
  // }

  // clickedClosedTasks() {
  //   if (this.open) {
  //     this.open = false;
  //     this.tasksToDisplay = this.tasksByIdArrayClosed.reverse();
  //     this.searchTextChanged(this.searchText);
  //     if (this.selectedOpenTasks) this.selectedOpenTasks = false;
  //   }
  // }

  // openTaskDetailDialog(task: taskModel1, status: boolean) {
  //   let dataObj = {
  //     "task": task,
  //     "status": status
  //   };
  //   this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: dataObj });
  // }

  // searchTextChanged(text: string) {
  //   this.searchText = this.stripWhiteSpaces(text);
  //   this.tasksToDisplay = [];
  //   this.open ? this.addTasksToDisplay(this.tasksByIdArray) : this.addTasksToDisplay(this.tasksByIdArrayClosed);

  // }

  // addTasksToDisplay(tasksArray: taskModel1[]) {
  //   tasksArray.forEach((task: taskModel1) => {
  //     if (this.getTaskTitle(task).includes(this.searchText) || (task.id).startsWith(this.searchText)) {
  //       this.tasksToDisplay.push(task);
  //     }
  //   })
  // }

  // stripWhiteSpaces(str) {
  //   return str.replace(/^\s+|\s+$/g, '');
  // }

  // getTaskTitle(task: taskModel1) {
  //   let taskDescription = task.description
  //   if ((task.description).split("\n")[1]) {
  //     taskDescription = (task.description).split("\n")[1];
  //   }
  //   return taskDescription.length <= 30 ? taskDescription : '...' + taskDescription.substring(0, 30);
  // }

  // ngOnDestroy() {
}
