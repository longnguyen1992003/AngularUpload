import { NgModule } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {LoginComponent} from "../login/login.component";
import {StudentComponent} from "./student/employees/student.component";
import {AuthenRoutingModule} from "./authen-routing.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import { ManagersComponent } from './manager/managers/managers.component';
import {httpInterceptorProviders} from "../interceptor";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
import { Profile } from './student/profile/profile';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import { DetailsComponent } from './student/details/details.component';
const ngZorroConfig: NzConfig = {
  message: {nzTop : 100}
};




@NgModule({
  declarations: [
  LoginComponent,
    StudentComponent,
    ManagersComponent,
    Profile,
    DetailsComponent,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  imports: [
    AuthenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NgForOf,
    NgIf,
    CommonModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzSelectModule

  ]
})
export class AuthenModule { }
