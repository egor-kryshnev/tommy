import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, CategoryOfIncidents, CategoryOfRequests, TransverseIncident } from './category.service'
import { PostReqService } from '../post-req.service';
import { MatDialog } from '@angular/material/dialog';
import { TransverseIncidentDialog } from '../transverse-incident/transverse-incident.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categoriesToDisplay: Array<string>;
  private categoryIdList: Array<string>;
  categoriesLoaded: Promise<boolean>;

  constructor(public categoryService: CategoryService, public route: ActivatedRoute, private router: Router,
    public postReqService: PostReqService, public transverseIncidentDialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryIdList = [];
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
<<<<<<< HEAD
            // this.categoryIdList.push(element["@id"]);
=======
            console.log(element);
>>>>>>> 541fb33
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
            // this.categoryIdList.push(element["@id"]);
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
    // const incident = this.categoryService.getTransverseIncident(category);
    // if (incident) { this.transverseIncidentDialog.open(TransverseIncidentDialog, {width: "430", height: "400", data: incident}) }
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
