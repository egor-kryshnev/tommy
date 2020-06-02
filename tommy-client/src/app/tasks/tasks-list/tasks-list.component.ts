import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { taskModel1 } from '../../apiget.service';
import { TaskDetailDialog } from '../../task-detail/task-detail.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnChanges {

  @Input() tasks: taskModel1[];
  constructor(public taskDetailDialog: MatDialog) { }

  ngOnChanges(): void {
    console.log(this.tasks);
  }

  ngOnInit(): void {
    console.log(this.tasks);
  }

  openTaskDetailDialog() {
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: this.tasks });
  }



}
