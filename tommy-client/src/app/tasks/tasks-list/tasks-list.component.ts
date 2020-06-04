import { Component, Input, OnInit, ɵConsole } from '@angular/core';
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
  @Input() tasksFlag: boolean;
  constructor(public taskDetailDialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.tasks);
  }

  openTaskDetailDialog(selectedTask) {
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: selectedTask });
  }

  getTitle(task): string | boolean {
    const taskSummary = task.summary;
    if(taskSummary && taskSummary !== null){
      return taskSummary;
    }
    return "לא צוין";
  }
}
