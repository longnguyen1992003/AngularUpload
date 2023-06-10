import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./Authen/login/login.component";
import {AuthenModule} from "./Authen/authen.module";


const routes : Routes=[
  {path:'login',redirectTo:'auth/login',pathMatch:'full'},
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
