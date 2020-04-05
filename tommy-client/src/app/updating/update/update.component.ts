import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() date: Date;
  @Input() description: string;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
