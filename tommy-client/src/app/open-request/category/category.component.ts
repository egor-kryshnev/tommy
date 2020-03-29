import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, CategoryOfIncidents, CategoryOfRequests } from './category.service'
import { PostReqService } from '../post-req.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categoriesToDisplay: Array<string>;
  categoriesLoaded: Promise<boolean>;

  constructor(public categoryService: CategoryService, public route: ActivatedRoute, private router: Router,
    public postReqService: PostReqService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setCategoriesOfIncidents(id);
  }

  setCategoriesOfIncidents(id: string) {
    let categoryList = []
    this.categoryService.getCategoriesOfIncidents(id)
      .subscribe((data: CategoryOfIncidents) => {
        const dataArray = data.collection_pcat.pcat;
        if (dataArray) {
          dataArray.forEach(element => {
            let splited = element["@COMMON_NAME"].split(".");
            categoryList.push(splited);
          });
        }
        this.setCategoriesOfRequests(id, categoryList);
      });
  }

  setCategoriesOfRequests(id: string, categoryList: any) {
    this.categoryService.getCategoriesOfRequests(id)
      .subscribe((data: CategoryOfRequests) => {
        const dataArray = data.collection_chgcat.chgcat;
        if (dataArray) {
          dataArray.forEach(element => {
            let splited = element["@COMMON_NAME"].split(".");
            categoryList.push(splited);
          });
        }
        this.categoryService.buildData(categoryList);
        this.categoriesToDisplay = this.categoryService.getCategoriesToDisplay();
        this.categoriesLoaded = Promise.resolve(true);
      })
  }

  selectedCategory(category: string) {
    this.categoryService.updateSelectedCategory(category);
    const selectedCategories: string = this.categoryService.getSelectedCategoryString();
    if (this.categoryService.hasNextSubCategory()) {
      this.router.navigate(['/subcategories', selectedCategories], { relativeTo: this.route });
    } else {
      this.router.navigate(['/description', selectedCategories], { relativeTo: this.route });
    }
  }

  onReturn() {
    this.router.navigate(['/services', this.postReqService.networkId], { relativeTo: this.route });
  }

}
