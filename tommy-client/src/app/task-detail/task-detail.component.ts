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
    return (this.data.task).description.length <= 200 ? (this.data.task).description : (this.data.task).description.substring(0, 200) + '...';
  }

  getOpenDate(): string {
    return (this.data.task).open_date;
  }

  getCategory(): string {
    return (this.data.task).category.split('.')[0];
  }

  getstatus(): boolean {
    if(this.data.task.status === "פתוח") {
      return true;
    } else if (this.data.task.status === "סגור") {
      return false;
    }
  }
}
