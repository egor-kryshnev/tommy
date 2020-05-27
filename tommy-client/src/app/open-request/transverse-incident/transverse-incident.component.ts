import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transverse-incident',
  templateUrl: './transverse-incident.component.html',
  styleUrls: ['./transverse-incident.component.css']
})
export class TransverseIncidentDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  onHomeClick() {
    console.log('hay');
  }
}
