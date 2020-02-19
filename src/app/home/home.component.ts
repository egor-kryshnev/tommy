import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onOpenDialog(){
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '1280px',
      height: '720px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
