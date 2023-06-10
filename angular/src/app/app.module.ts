import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {AuthenModule} from "./Authen/authen.module";
import {AuthenRoutingModule} from "./Authen/authen-routing.module";
import {Router, RouterModule} from "@angular/router";


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    AuthenModule,
    AuthenRoutingModule,
    RouterModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US,deps:[Router] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
