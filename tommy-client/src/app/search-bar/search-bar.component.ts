import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() textChanged = new EventEmitter<string>();
  serachText: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: KeyboardEvent) {
    const text: string = (event.target as HTMLInputElement).value
    this.serachText = text;
    this.textChanged.emit(text);
  }

}
