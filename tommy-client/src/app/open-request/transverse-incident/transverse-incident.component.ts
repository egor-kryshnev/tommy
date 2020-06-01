import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransverseIncident } from '../category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transverse-incident',
  templateUrl: './transverse-incident.component.html',
  styleUrls: ['./transverse-incident.component.css']
})
export class TransverseIncidentDialog implements OnInit {
  description: String;
  open_date: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TransverseIncident, private router: Router, public dialogRef: MatDialogRef<TransverseIncidentDialog>) { }

  ngOnInit() {
    this.description = this.data.collection_cr.cr[0].description;
    const date = new Date(this.data.collection_cr.cr[0].open_date);
    this.open_date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  }
  onHomeClick() {
    this.router.navigateByUrl('');
    this.dialogRef.close();
  }

  onOpenNewIncident() {
    this.router.navigateByUrl('/newtask');
    this.dialogRef.close();
  }
}
