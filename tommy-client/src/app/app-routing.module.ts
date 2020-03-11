import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UpdatingComponent } from './updating/updating.component';
import { HomeComponent } from './home/home.component';
import { NetworksComponent } from './networks/networks.component';
import { ServicesComponent } from './services/services.component';
import { DescriptionComponent } from './description/description.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newtask', component: NetworksComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'subcategories/:id', component: SubcategoryComponent},
  { path: 'description/:id', component: DescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
