import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { taskModel1 } from '../../apiget.service';
import { TaskDetailDialog } from '../../task-detail/task-detail.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  @Input() tasks: taskModel1[]; 
  constructor(public taskDetailDialog: MatDialog) { }
  
  ngOnInit(): void {
    console.log("abet");
    console.log(this.tasks);
  }

  openTaskDetailDialog() {
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: this.tasks });
  }

}
