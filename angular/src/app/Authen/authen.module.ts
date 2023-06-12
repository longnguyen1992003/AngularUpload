import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {LoginComponent} from "../login/login.component";
import {StudentComponent} from "./student/employees/student.component";
import {AuthenRoutingModule} from "./authen-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import { ManagersComponent } from './manager/managers/managers.component';
import {httpInterceptorProviders} from "../interceptor";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
const ngZorroConfig: NzConfig = {
  message: {nzTop : 100}
};




@NgModule({
  declarations: [
  LoginComponent,
    StudentComponent,
    ManagersComponent,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  imports: [
    // CommonModule,
    AuthenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NgForOf,

  ]
})
export class AuthenModule { }
