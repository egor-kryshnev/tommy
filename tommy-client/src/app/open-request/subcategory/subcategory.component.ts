import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostReqService } from '../post-req.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  public categoriesToDisplay: Array<string>;
  filterCategories: Array<string>;
  searchText = "";
  
  constructor(public categoryService: CategoryService, public route: ActivatedRoute, private router: Router,
    public postReqService: PostReqService) { }

  ngOnInit() {
    this.categoriesToDisplay = this.categoryService.getCategoriesToDisplay();
    this.filterCategories = this.categoriesToDisplay;

  }

  selectedSubCategory(category: string) {
    this.categoryService.updateSelectedCategory(category);
    const selectedCategories: string = this.categoryService.getSelectedCategoryString();
    if (this.categoryService.hasNextSubCategory()) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/subcategories', selectedCategories], { relativeTo: this.route });
      });
    } else {
      this.router.navigate(['/description', selectedCategories], { relativeTo: this.route });
    }
  }

  onReturn() {
    this.router.navigate(['/categories', this.postReqService.serviceId], { relativeTo: this.route });
  }

  searchTextChanged(text: string) {
    console.log(`text: ${text}`);
    this.searchText = this.stripWhiteSpaces(text);
    console.log(`filter service: ${this.filterCategories}`);
    this.addCategoryToDisplay(this.filterCategories);
  }

  addCategoryToDisplay(filterArray: Array<string>) {
    this.filterCategories = this.categoriesToDisplay.filter((category: string) => {
      return category.includes(this.searchText);
    });
  }

  stripWhiteSpaces(str) {
    return str.replace(/^\s+|\s+$/g, "");
  }


}
