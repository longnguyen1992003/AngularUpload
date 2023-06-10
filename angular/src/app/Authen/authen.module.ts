import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {StudentComponent} from "./student/student.component";
import {AuthenRoutingModule} from "./authen-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";



@NgModule({
  declarations: [
  LoginComponent,
    StudentComponent,
  ],
  imports: [
    CommonModule,
    AuthenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class AuthenModule { }
