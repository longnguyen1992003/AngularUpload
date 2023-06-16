import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {AuthenModule} from "./Authen/authen.module";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {StudentComponent} from "./Authen/student/employees/student.component";
import {AppComponent} from "./app.component";
import {ManagersComponent} from "./Authen/manager/managers/managers.component";


const routes : Routes=[
  {path:'',redirectTo:'auth/login',pathMatch:"full"},
  {path:'login',redirectTo:'/auth/login'},
  {path:'register',redirectTo:'/auth/register'},
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
