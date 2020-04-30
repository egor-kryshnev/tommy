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
    console.log((this.data.task).description);
    let description = (this.data.task).description.split("\n")[1];
    return description.length <= 200 ? description : description.substring(0, 200) + '...';
    // return (this.data.task).description.length <= 200 ? (this.data.task).description : (this.data.task).description.substring(0, 200) + '...';
  }

  getOpenDate(): string {
    return (this.data.task).open_date;
  }

  getCategory(): string {
    const taskDescription = (this.data.task).category.split("\n")[1];
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
