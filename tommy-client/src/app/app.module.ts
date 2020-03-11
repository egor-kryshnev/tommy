import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbCardModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatButtonModule } from '@angular/material/button';
import { TasksComponent } from './tasks/tasks.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UpdatingComponent } from './updating/updating.component';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './home/home.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NetworksComponent } from './networks/networks.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { CategoryComponent } from './category/category.component'
import { DescriptionComponent } from './description/description.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CategoryListComponent } from './category-list/category-list.component'
import { EventEmiterService } from './event.emmiter.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UpdatingComponent,
    HomeComponent,
    TaskDetailComponent,
    NetworksComponent,
    ServicesComponent,
    DescriptionComponent,
    CategoryComponent,
    SubcategoryComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule
    
  ],
  providers: [EventEmiterService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }