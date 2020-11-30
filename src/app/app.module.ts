import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClassroomComponent } from './classroom/classroom.component';
import { UserComponent } from './user/user.component';
import { Page404Component } from './page404/page404.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { ViewClassroomComponent } from './classroom/view-classroom/view-classroom.component';
import { EditClassroomComponent } from './classroom/edit-classroom/edit-classroom.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { NewClassroomComponent } from './classroom/new-classroom/new-classroom.component';
import { NewUserComponent } from './user/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomComponent,
    UserComponent,
    Page404Component,
    PreloaderComponent,
    ViewClassroomComponent,
    EditClassroomComponent,
    EditUserComponent,
    ViewUserComponent,
    NewClassroomComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
