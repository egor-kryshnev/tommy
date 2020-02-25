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

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    UpdatingComponent,
    HomeComponent,
    TaskDetailComponent,
    NetworksComponent
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
