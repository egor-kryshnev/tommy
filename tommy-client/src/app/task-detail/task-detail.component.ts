import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { taskModel1 } from '../apiget.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailDialog {
  public statusList: string[] = ["ממתין לטיפול", "בטיפול צוות מחשוב", "בטיפול צוות טכני", "בטיפול אפסנאות", "טיפול הסתיים"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  getDesc(): string {
    let taskDescription = (this.data.task).description
    if(((this.data.task).description).split("\n")[1]){
      taskDescription = ((this.data.task).description).split("\n")[1];
    }
    return taskDescription.length <= 200 ? taskDescription : taskDescription.substring(0, 200) + '...';
  }

  getOpenDate(): string {
    return (this.data.task).open_date;
  }

  getCategory(): string {
    const taskDescription = (this.data.task).category.split("\n")[1];
    return taskDescription.length <= 30 ? taskDescription : '...' + taskDescription.substring(0, 30);
  }

  getTaskTitle() {
    let taskDescription = (this.data.task).description
    if(((this.data.task).description).split("\n")[1]){
      taskDescription = ((this.data.task).description).split("\n")[1];
    }
    return taskDescription.length <= 30 ? taskDescription : '...' + taskDescription.substring(0, 30);
  }

  getstatus(): boolean {
    if (this.data.task.status === "פתוח") {
      return true;
    } else if (this.data.task.status === "סגור") {
      return false;
    }
  }
}
