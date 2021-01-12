import { Injectable } from '@angular/core';
import { model1 } from './apiget.service';

@Injectable({
  providedIn: 'root'
})
export class SpecPlaceService {

  specPlace: model1={id: '', value:''};
  placesList: model1[];

  constructor() { }

  public setPlace(place: model1) {
    this.specPlace = {
      id: place.id,
      value: place.value
    }
  }

  public setPlaces(places: model1[]) {
    this.placesList = places;
  }
}
