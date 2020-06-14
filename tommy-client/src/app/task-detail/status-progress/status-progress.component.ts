import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-progress',
  templateUrl: './status-progress.component.html',
  styleUrls: ['./status-progress.component.css']
})
export class StatusProgressComponent implements OnInit {

  @Input() status: string;
  @Input() number: string;
  @Input() isPressed: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }
}
