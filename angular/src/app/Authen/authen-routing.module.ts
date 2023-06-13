import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {StudentComponent} from "./student/employees/student.component";
import {ManagersComponent} from "./manager/managers/managers.component";


const routes : Routes=[
  {path:'login',component:LoginComponent },
  {path:'employees',component:StudentComponent},
  {path:'managers',component:ManagersComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenRoutingModule { }
