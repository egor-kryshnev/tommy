import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { taskModel1 } from '../apiget.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailDialog {

  // taskGroup = (this.data.task).group;
  // taskNetwork = (this.data.task).network;
  // taskService = (this.data.task).service;
  // statusList: string[] = [this.taskGroup];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  getDesc(): string {
    let taskDescription = this.data.description;
    if (this.data.description.split("\n")[1]) {
      taskDescription = ((this.data.description).split("\n")[1]);
    }
    return taskDescription.length <= 200 ? taskDescription : taskDescription.substring(0, 200) + '...';
  }

  getOpenDate(): string {
    return this.data.open_date;
  }

  // getCategory(): string {
  //   const taskDescription = (this.data.task).description.split("\n")[1];
  //   return taskDescription.length <= 30 ? taskDescription : '...' + taskDescription.substring(0, 30);
  // }

  // getNetwork(): string {
  //   const taskNetwork = (this.data.task).network;
  //   return taskNetwork;
  // }

  // getGroup() {
  //   let taskGroup = (this.data.task).group;
  //   this.statusList.push(taskGroup);
  // }

  getTaskTitle() {
    let taskDescription = (this.data.description);
    if (this.data.description.split("\n")[1]) {
      taskDescription = ((this.data.description).split("\n")[1]);
    }
    return taskDescription.length <= 30 ? taskDescription : '...' + taskDescription.substring(0, 30);
  }

  getstatus(): boolean {
    return this.data.status;
  }
}
