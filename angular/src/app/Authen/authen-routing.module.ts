import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {StudentComponent} from "./student/employees/student.component";
import {ManagersComponent} from "./manager/managers/managers.component";
import {EmployeeUpdateComponent} from "./student/employee-update/employee-update.component";
import {RegisterComponent} from "../register/register.component";


const routes : Routes=[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent },
  {path:'employees',component:StudentComponent},
  {path:'managers',component:ManagersComponent},
  {path:'employee-update',component:EmployeeUpdateComponent},
  {path:'register',component:RegisterComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthenRoutingModule { }
