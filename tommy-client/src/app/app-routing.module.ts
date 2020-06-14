import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NetworksComponent } from './open-request/networks/networks.component';
import { ServicesComponent } from './open-request/services/services.component';
import { DescriptionComponent } from './open-request/description/description.component';
import { CategoryComponent } from './open-request/category/category.component';
import { SubcategoryComponent } from './open-request/subcategory/subcategory.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newtask', component: NetworksComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'subcategories/:id', component: SubcategoryComponent },
  { path: 'description/:id', component: DescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
