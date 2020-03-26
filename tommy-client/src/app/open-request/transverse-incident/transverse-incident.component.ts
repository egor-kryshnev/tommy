import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransverseIncident } from '../category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transverse-incident',
  templateUrl: './transverse-incident.component.html',
  styleUrls: ['./transverse-incident.component.css']
})
export class TransverseIncidentDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TransverseIncident, private router: Router) { }

  onHomeClick() {
    this.router.navigateByUrl('');
  }

  onOpenNewIncident() {
    this.router.navigateByUrl('/networks');
  }
}
