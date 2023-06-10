import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AccountResponse} from "../AccountRespone";
import {AuthenticationService} from "../../service/authentication.service";

import {NzMessageService} from "ng-zorro-antd/message";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {isCheckDisabled} from "ng-zorro-antd/core/tree";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  accountResponse: AccountResponse | undefined;
  user: any;
  loggedIn: any;

  courseId!: number

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private nzMessageService :NzMessageService,
              private titleService:Title) {
    this.titleService.setTitle("QuizLab - Sign In");

  }


  ngOnInit(): void {
    console.log("123")
    this.login()
  }
  login(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.invalid) {
      return;
    }
    LocalStorageUlti.removeLoginInfor();
    const payload = this.loginForm.value;
    this.authenticationService.login(payload).subscribe({
      next: res => {
        if (res.accessToken) {
          LocalStorageUlti.saveAccessToken(res.accessToken);
          LocalStorageUlti.setAccount(res.email);
          LocalStorageUlti.setAccount(res.role);
          this.nzMessageService.success("Sign In Success")
        }
      },
      error: err => {
        this.nzMessageService.error("Account or password incorrect!")
      }

    });

  }


  protected readonly isCheckDisabled = isCheckDisabled;
}
