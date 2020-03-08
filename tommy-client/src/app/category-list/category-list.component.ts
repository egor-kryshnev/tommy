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
  @Output() onCategoryChoice: EventEmitter<string> = new EventEmitter<string>(); 
  constructor(public categoriesDataService: CategoriesDataService, public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategoriesToDisplay();
    console.log(this.categories);
  }

  onCategory(category: string){
    this.onCategoryChoice.emit(category);
  }

}
