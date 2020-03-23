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

  getOpenDate(): string {
    // const dateObj = new Date(this.data.open_date);
    // let dd = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
    // let mm = dateObj.getMonth() + 1 < 10 ? '0' + dateObj.getMonth() + 1 : dateObj.getMonth() + 1;
    // const yyyy = dateObj.getFullYear();
    // console.log(this.data.open_date);
    // return `${dd}/${mm}/${yyyy}`;
    return this.data.open_date;
  }

  getCategory(): string {
    return this.data.category.split('.')[0];
  }
}
