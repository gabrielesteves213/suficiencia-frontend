import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guard/auth-guard.guard";
import {NewStudentComponent} from "./students/new-student/new-student.component";
import {ListStudentComponent} from "./students/list-student/list-student.component";
import {NewUserComponent} from "./users/new-user/new-user.component";
import {ListUserComponent} from "./users/list-user/list-user.component";

const routes: Routes = [
    {path : 'login', component: LoginComponent},
    {path: 'student/new', component: NewStudentComponent, canActivate: [AuthGuard]},
    {path: 'student/list', component: ListStudentComponent, canActivate: [AuthGuard]},
    {path: 'user/new', component: NewUserComponent, canActivate: [AuthGuard]},
    {path: 'user/list', component: ListUserComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'student/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
