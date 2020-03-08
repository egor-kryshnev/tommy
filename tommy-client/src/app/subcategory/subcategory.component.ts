import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  constructor(public categoryService: CategoryService, public route: ActivatedRoute, private router: Router,) { }

  ngOnInit(){
    console.log("started subCategory");
  }

  selectedSubCategory(category: string){
    this.categoryService.updateSelectedCategory(category);
    const selectedCategories: string = this.categoryService.getSelectedCategoryString();
    if(this.categoryService.hasNextSubCategory()){
      console.log("in if")
      this.router.navigate(['/subcategories', selectedCategories], {relativeTo: this.route});
    }else{
      console.log("in else")
      this.router.navigate(['/description', selectedCategories], {relativeTo: this.route});
    }
    // this.router.navigate(['/subcategories', selectedCategories], {relativeTo: this.route});
  }

  onReturn(){

  }

}
