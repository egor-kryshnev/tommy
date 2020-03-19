import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../category/category.service'
import { CategoriesDataService } from '../categories-data.service'


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  public categories: Array<String>;
  categoriesToDisplay: any[];
  limit: number = 7;
  @Output() onCategoryChoice: EventEmitter<string> = new EventEmitter<string>();
  constructor(public categoriesDataService: CategoriesDataService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategoriesToDisplay();
    this.setCategoriesToDisplay();
  }

  onCategory(category: string) {
    this.onCategoryChoice.emit(category);
  }

  showMore() {
    if (this.categories.length > this.limit) this.limit = this.categories.length;
    this.setCategoriesToDisplay();
  }

  showLess() {
    this.limit = 7;
    this.setCategoriesToDisplay();
  }

  setCategoriesToDisplay() {
    this.categoriesToDisplay = [];
    let i = 0;
    for (let category of this.categories) {
      if (i < this.limit && i < this.categories.length) {
        this.categoriesToDisplay.push(category);
        i++;
      } else {
        return;
      }
    }
  }

}
