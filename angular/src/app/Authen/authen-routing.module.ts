import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {StudentComponent} from "./student/employees/student.component";
import {ManagersComponent} from "./manager/managers/managers.component";
import {Profile} from "./student/profile/profile";
import {RegisterComponent} from "../register/register.component";
import {DetailsComponent} from "./student/details/details.component";


const routes : Routes=[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent },
  {path:'employees',component:StudentComponent},
  {path:'managers',component:ManagersComponent},
  {path:'profile',component:Profile},
  {path:'register',component:RegisterComponent},
  {path:'details/:id',component:DetailsComponent}

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthenRoutingModule { }
