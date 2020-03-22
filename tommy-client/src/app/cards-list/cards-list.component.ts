import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { model1 } from '../apiget.service'

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  @Input() cardsList: string[];
  @Output() selected = new EventEmitter<string>();
  cardsListToDisplay: string[];
  limit: number = 7;

  constructor() { }

  ngOnInit(): void {
    this.setCardListToDisplay();
  }

  setCardListToDisplay() {
    this.cardsListToDisplay = [];
    let i = 0;
    for (let listItem of this.cardsList) {
      if (i < this.limit && i < this.cardsList.length) {
        this.cardsListToDisplay.push(listItem);
        i++;
      } else {
        return;
      }
    }
  }

  onSelectCard(cardName: string) {
    this.selected.emit(cardName);
  }

  showMore() {
    if (this.cardsList.length > this.limit) this.limit = this.cardsList.length;
    this.setCardListToDisplay();
  }

  showLess() {
    this.limit = 7;
    this.setCardListToDisplay();
  }




}
