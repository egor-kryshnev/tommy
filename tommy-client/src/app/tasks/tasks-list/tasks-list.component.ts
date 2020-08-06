import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { taskModel1, ApigetService } from '../../apiget.service';
import { TaskDetailDialog } from '../../task-detail/task-detail.component';
import { HomeComponent } from './../../home/home.component';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { param } from 'jquery';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 500,
};

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})
export class TasksListComponent {

  @Input() tasks: taskModel1[];
  @Input() tasksFlag: boolean;
  chatIcon: string = "../../../assets/supporter-logo.png";
  closeIcon: string = "../../../assets/close.png"
  constructor(public taskDetailDialog: MatDialog, public aPIgetService: ApigetService) { }

  openTaskDetailDialog(selectedTask) {
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: selectedTask });
  }

  getNetwork(task: taskModel1): string | boolean{
    return task.network || 'לא צויין';
  }

  getService(task: taskModel1): string | boolean{
    return task.service || 'לא צויין';
  }

  sendTaskSumMsg(task: taskModel1) {
    const msg: object = {
      taskId: task.id,
      taskSummary: task.summary,
      taskDate: task.open_date,
      taskLink: task.link,
    }
    this.aPIgetService.sendTaskSumMsg(msg).subscribe(() => {
      this.openChatBox();
    });
  }

  openChatBox() {
    document.getElementById("cloack").className = "visible";
    HomeComponent.chatDisplayFlag = true;
  }

  getTaskType(task: taskModel1): 'chg' | 'in' {
    if(typeof task.type === "string") {
      return 'chg';
    } else if (typeof task === "object") {
      return 'in';
    }
  }
  
  getTaskNewStatus(task: taskModel1): 'CNCL' | 'CL' {
    return task.statusCode == "RFC" || task.statusCode == "OP" ? "CNCL" : "CL";
  }

  closeTask(task: taskModel1) {
    const params = {
      type: this.getTaskType(task),
      id: task.serial_id,
      status: this.getTaskNewStatus(task)
    }
    this.aPIgetService.updateTaskStatus(params.type, params.id, params.status);
  }

}
