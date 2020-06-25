import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { taskModel1, ApigetService } from '../../apiget.service';
import { TaskDetailDialog } from '../../task-detail/task-detail.component';
import { HomeComponent } from './../../home/home.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

  @Input() tasks: taskModel1[];
  @Input() tasksFlag: boolean;
  chatIcon: string = "../../../assets/supporter-logo.png";
  constructor(public taskDetailDialog: MatDialog, public aPIgetService: ApigetService) { }

  openTaskDetailDialog(selectedTask) {
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: selectedTask });
  }

  getTitle(task: taskModel1): string | boolean {
    const taskSummary = task.summary;
    if (taskSummary && taskSummary !== null) {
      return taskSummary;
    }
    return "לא צוין";
  }

  sendTaskSumMsg(task: taskModel1) {
    const msg: object = {
      taskId: task.id,
      taskSummary: task.summary,
      taskDate: task.open_date
    }
    this.aPIgetService.sendTaskSumMsg(msg).subscribe(() => {
      this.openChatBox();
    });
  }

  openChatBox() {
    document.getElementById("cloack").className = "visible";
    HomeComponent.chatDisplayFlag = !HomeComponent.chatDisplayFlag;
  }

}
