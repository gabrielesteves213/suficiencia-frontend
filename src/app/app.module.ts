import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./guard/auth-guard.guard";
import {ButtonModule} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {CardModule} from "primeng/card";
import {HttpClientModule} from "@angular/common/http";
import { NewStudentComponent } from './students/new-student/new-student.component';
import { MenuComponent } from './menu/menu.component';
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import { ListStudentComponent } from './students/list-student/list-student.component';
import {TableModule} from "primeng/table";
import { NewUserComponent } from './users/new-user/new-user.component';
import {DropdownModule} from "primeng/dropdown";
import { ListUserComponent } from './users/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewStudentComponent,
    MenuComponent,
    ListStudentComponent,
    NewUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    CardModule,
    HttpClientModule,
    MessagesModule,
    InputTextModule,
    TableModule,
    DropdownModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
