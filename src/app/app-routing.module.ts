import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { EditClassroomComponent } from './classroom/edit-classroom/edit-classroom.component';
import { NewClassroomComponent } from './classroom/new-classroom/new-classroom.component';
import { ViewClassroomComponent } from './classroom/view-classroom/view-classroom.component';
import { Page404Component } from './page404/page404.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { UserComponent } from './user/user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/classrooms',
    pathMatch: 'full'
  },
  {
    path:  'classrooms',
    component:  ClassroomComponent
  },
  {
    path:  'classrooms/new',
    component:  NewClassroomComponent
  },
  {
    path:  'classrooms/view/:classroomId',
    component:  ViewClassroomComponent
  },
  {
    path:  'classrooms/edit/:classroomId',
    component:  EditClassroomComponent
  },
  {
    path:  'users',
    component:  UserComponent
  },
  {
    path:  'users/new',
    component:  NewUserComponent
  },
  {
    path:  'users/edit/:userId',
    component:  EditUserComponent
  },
  {
    path:  'users/view/:userId',
    component:  ViewUserComponent
  },
  {
    path: '**',
    component: Page404Component
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
