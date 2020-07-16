import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransverseIncident, CategoryService } from '../category/category.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface TransverseIncidentData extends TransverseIncident {
  selectedCategories: string;
}

@Component({
  selector: 'app-transverse-incident',
  templateUrl: './transverse-incident.component.html',
  styleUrls: ['./transverse-incident.component.css']
})
export class TransverseIncidentDialog implements OnInit {
  description: String;
  open_date: String;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransverseIncidentData,
    private router: Router,
    public route: ActivatedRoute,
    public dialogRef: MatDialogRef<TransverseIncidentDialog>) { }

  ngOnInit() {
    this.description = this.data.collection_in.in[0].description;
    const date = new Date(this.data.collection_in.in[0].open_date);
    this.open_date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  }
  onHomeClick() {
    this.router.navigateByUrl('');
    this.dialogRef.close();
  }

  onOpenNewIncident() {
    const selectedCategories: string = this.data.selectedCategories;
    this.router.navigate(['/description', selectedCategories], { relativeTo: this.route });
    this.dialogRef.close();
  }
}
