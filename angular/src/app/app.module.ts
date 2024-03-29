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
import {Router, RouterModule} from "@angular/router";
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import {httpInterceptorProviders} from "./interceptor";
import {NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";
import { RegisterComponent } from './register/register.component';
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  message: {nzTop : 100}
};
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
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
    RouterModule,
    NzMessageModule,
    NzTableModule,
    NzSpaceModule,
    NzSelectModule,
    NzDatePickerModule

  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
