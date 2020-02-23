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
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UpdatingComponent,
    HomeComponent,
    NewTaskComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    // NbEvaIconsModule,
    // NbChatModule,
    MatButtonModule,
    // NbCardModule,
    // NbListModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
