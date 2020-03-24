import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-request',
  templateUrl: './finish-request.component.html',
  styleUrls: ['./finish-request.component.css']
})
export class FinishRequestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FinishRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public requestId: string) { }

  onFinishClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
