import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NbThemeModule, NbLayoutModule, NbChatModule, NbCardModule, NbListModule } from '@nebular/theme';
import { MatButtonModule } from '@angular/material/button';
import { TasksComponent } from './tasks/tasks.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UpdatingComponent } from './updating/updating.component';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './home/home.component';
import { TaskDetailDialog } from './task-detail/task-detail.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NetworksComponent } from './networks/networks.component';
import { ServicesComponent } from './services/services.component';
import { CategoryComponent } from './category/category.component'
import { DescriptionComponent } from './description/description.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { EventEmiterService } from './event.emmiter.service';
import { AuthService } from './auth.service';
import { StatusProgressComponent } from './task-detail/status-progress/status-progress.component';
import { FinishRequestComponent } from './finish-request/finish-request.component';
import { HeaderComponent } from './header/header.component';
import { CardsListComponent } from './cards-list/cards-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UpdatingComponent,
    HomeComponent,
    TaskDetailDialog,
    NetworksComponent,
    ServicesComponent,
    DescriptionComponent,
    CategoryComponent,
    SubcategoryComponent,
    StatusProgressComponent,
    FinishRequestComponent,
    CardsListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NbThemeModule.forRoot({ name: 'default' }),
    // NbLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    MatDialogModule

  ],
  providers: [EventEmiterService, AuthService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }],
  bootstrap: [AppComponent],
  entryComponents: [FinishRequestComponent]
})
export class AppModule { }
