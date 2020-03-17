import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generate } from 'rxjs';
import { config } from './../../environments/config.dev';


export interface CategoryOfIncidents {
  "collection_pcat": {
    "pcat": {
      "@COMMON_NAME": string
    }[];
  }
}

export interface CategoryOfRequests {
  "collection_chgcat": {
    "chgcat": {
      "@COMMON_NAME": string
    }[];
  }
}



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: any;
  selectedCategory: Array<string>;
  //categories: Array<Array<string>>;
  categoriesToDisplay: Array<string>;
  accessKey: string = '59975677';

  categoriesRequestHeaders = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('X-AccessKey', this.accessKey)
    .set('Accept', 'application/json')


  getCategoriesOfIncidents(serviceId: string) {
    return this.http.get(config.GET_CATEGORIES_OF_INCIDENTS_URL_FUNCTION(serviceId),
      { headers: this.categoriesRequestHeaders }
    );
  }

  getCategoriesOfRequests(serviceId: string) {
    return this.http.get(config.GET_CATEGORIES_OF_REQUESTS_URL_FUNCTION(serviceId),
      { headers: this.categoriesRequestHeaders }
    );
  }


  buildData(categoryList) {
    this.selectedCategory = [];
    this.categories = CategoryService.generateObject(categoryList);
  }

  getCategoriesToDisplay() {
    if (!this.selectedCategory) {
      return Object.keys(this.categories);
    }
    else {
      let currObj = this.categories;
      for (let i = 0; i < (this.selectedCategory).length; i++) {
        let currKey = this.selectedCategory[i];
        if (currObj.hasOwnProperty(currKey)) {
          currObj = currObj[currKey];
        }
      }
      return Object.keys(currObj);
    }
  }

  updateSelectedCategory(category: string) {
    this.selectedCategory.push(category);
  }

  getSelectedCategoryString() {
    let selectedCategoryString = "";
    if (this.selectedCategory.length == 1) selectedCategoryString = this.selectedCategory[0];
    else {
      this.selectedCategory.forEach(element => {
        selectedCategoryString = selectedCategoryString + "." + element;
      });
    }
    return selectedCategoryString;
  }

  hasNextSubCategory() {
    console.log(this.getCategoriesToDisplay())
    if ((this.getCategoriesToDisplay()).length == 0) {
      return false;
    }
    return true;
  }

  private static buildNewProperty(obj, array) {
    let currObject = obj;
    for (let i = 1; i < array.length; i++) {
      if (!currObject[array[i]]) {
        currObject[array[i]] = {};
      }

      currObject = currObject[array[i]];
    }
  }

  private static generateObject(arrays) {
    const obj = {};
    arrays.forEach(array => {
      CategoryService.buildNewProperty(obj, array);
    });

    return obj;
  }

  constructor(private http: HttpClient) { }
}
