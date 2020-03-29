import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApigetService, taskModel1 } from '../apiget.service';
import { AuthService } from '../auth.service';
import { EventEmiterService } from '../event.emmiter.service';
import { TaskDetailDialog } from './../task-detail/task-detail.component';

export interface Pnia {
  title: string;
  date: Date;
  id: number;
  time: Date;
}


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedOpenTasks: Boolean = true;
  tasksArray: taskModel1[] = [];
  tasksArrayClosed: taskModel1[] = [];
  tasksByIdArray: taskModel1[] = [];
  tasksByIdArrayClosed: taskModel1[] = [];

  tasksToDisplay: taskModel1[] = [];
  tasksToDisplayClosed: taskModel1[] = [];
  tasks: taskModel1[];
  open = true;
  searchText: string = "";

  constructor(private router: Router, private route: ActivatedRoute, public aPIgetService: ApigetService, public _eventEmmitter: EventEmiterService, public authService: AuthService, public taskDetailDialog: MatDialog) { }

  ngOnInit() {
    this._eventEmmitter.dataStr.subscribe(data => {
      console.log("in event emitter");
      this._eventEmmitter.str = data;
      this.getopen();
      this.getClosed();
    });
    this.getOpenInReturn(this._eventEmmitter.str);
    this.getClosedinReturn(this._eventEmmitter.str);
  }



  getopen() {
    this.aPIgetService.getOpenTasks(this._eventEmmitter.str).subscribe((res: any) => {
      console.log(res);
      this.tasksArray = res.collection_cr.cr;
      this.tasksArray.forEach((element: any) => {
        let current_datetime = new Date(element.open_date);
        let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear()
        this.tasksByIdArray.push(
          {
            "id": element["@COMMON_NAME"],
            "description": element.description,
            "status": element.status["@COMMON_NAME"],
            "category": element.category["@COMMON_NAME"],
            "open_date": formatted_date,
            "icon": this.iconGenerator()
          } as taskModel1
        );
      })
      this.tasksToDisplay = this.tasksByIdArray;
    });


  }

  getOpenInReturn(event) {
    if (event) {
      this.tasksByIdArray = [];
      this.aPIgetService.getOpenTasks(event).subscribe((res: any) => {
        this.tasksArray = res.collection_cr.cr;
        this.tasksArray.forEach((element: any) => {
          let current_datetime = new Date(element.open_date);
          let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear()
          this.tasksByIdArray.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"],
              "category": element.category["@COMMON_NAME"],
              "open_date": formatted_date,
              "icon": this.iconGenerator()
            } as taskModel1
          );
        })
        this.tasksToDisplay = this.tasksByIdArray;
      });
    }
  }

  getClosed() {
    this.aPIgetService.getClosedTasks(this._eventEmmitter.str).subscribe((res: any) => {
      console.log(res);
      this.tasksArrayClosed = res.collection_cr.cr;
      this.tasksArrayClosed.forEach((element: any) => {
        let current_datetime = new Date(element.open_date);
        let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear()
        this.tasksByIdArrayClosed.push(
          {
            "id": element["@COMMON_NAME"],
            "description": element.description,
            "status": element.status["@COMMON_NAME"],
            "category": element.category["@COMMON_NAME"],
            "open_date": formatted_date,
            "icon": this.iconGenerator()
          } as taskModel1
        );
      })
    });
  }

  getClosedinReturn(event) {
    if (event) {
      this.tasksByIdArrayClosed = [];
      this.aPIgetService.getClosedTasks(event).subscribe((res: any) => {
        console.log(res);
        this.tasksArrayClosed = res.collection_cr.cr;
        this.tasksArrayClosed.forEach((element: any) => {
          let current_datetime = new Date(element.open_date);
          let formatted_date = current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + current_datetime.getFullYear()
          this.tasksByIdArrayClosed.push(
            {
              "id": element["@COMMON_NAME"],
              "description": element.description,
              "status": element.status["@COMMON_NAME"],
              "category": element.category["@COMMON_NAME"],
              "open_date": formatted_date,
              "icon": this.iconGenerator()
            } as taskModel1
          );
        })
      });
    }
  }

  iconGenerator() {
    let imgNumber = Math.floor(Math.random() * 3) + 1;;
    let statusIcon = "../../assets/status" + imgNumber + ".png";
    return statusIcon;
  }

  onOpenDialog() {
    this.router.navigateByUrl('newtask', { relativeTo: this.route });
  }

  clickedOpenTasks() {
    if (!this.open) {
      this.open = true;
      this.tasksToDisplay = this.tasksByIdArray;
      this.searchTextChanged(this.searchText);
      if (!this.selectedOpenTasks) this.selectedOpenTasks = true;
    }
  }

  clickedClosedTasks() {
    if (this.open) {
      this.open = false;
      this.tasksToDisplay = this.tasksByIdArrayClosed;
      this.searchTextChanged(this.searchText);
      if (this.selectedOpenTasks) this.selectedOpenTasks = false;
    }
  }

  openTaskDetailDialog(task: taskModel1, status: boolean) {
    let dataObj = {
      "task": task,
      "status": status
    };
    this.taskDetailDialog.open(TaskDetailDialog, { width: "720px", height: "400px", data: dataObj });
  }

  searchTextChanged(text: string) {
    this.searchText = this.stripWhiteSpaces(text);
    this.tasksToDisplay = [];
    this.open ? this.addTasksToDisplay(this.tasksByIdArray) : this.addTasksToDisplay(this.tasksByIdArrayClosed);

  }

  addTasksToDisplay(tasksArray: taskModel1[]) {
    tasksArray.forEach((task: taskModel1) => {
      if ((task.description).includes(this.searchText)) {
        this.tasksToDisplay.push(task);
      }
    })
  }

  stripWhiteSpaces(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }
}
