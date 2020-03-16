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
  constructor(@Inject(MAT_DIALOG_DATA) public data: taskModel1) { }

  getDesc(): string {
    return this.data.description.length <= 200 ? this.data.description : this.data.description.substring(0, 200) + '...';
  }
}
