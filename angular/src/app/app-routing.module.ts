import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthenModule} from "./Authen/authen.module";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {StudentComponent} from "./Authen/student/employees/student.component";


const routes : Routes=[
  {path:'login',redirectTo:'/login'},
  {path:'employees',component:StudentComponent,canActivate:[AuthenticationGuard]},
  {path:'managers',redirectTo:'auth/managers',pathMatch:'full'},
  {path:'auth',loadChildren: () => import('./Authen/authen.module').then(m => m.AuthenModule)   },
]

@NgModule({
  declarations: [ ],
  imports:
    [RouterModule.forRoot(routes)],
  exports:
    [RouterModule],
}
)
export class AppRoutingModule { }
