import {Component, OnInit} from '@angular/core';
import {AccountResponse} from "../Authen/InforRespone";
import {AuthenticationService} from "../service/authentication.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalStorageUlti} from "../ulti/local-storage-ulti";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AccountResponse = new AccountResponse();
  loginForm !: FormGroup;


  constructor(private authenService: AuthenticationService,
              private messeage: NzMessageService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      account: new FormControl('', [Validators.requiredTrue]),
      password: new FormControl('', [Validators.requiredTrue])
    })

  }

  login() {
    console.log(this.user);
    if (LocalStorageUlti.getAccessToken()){
      LocalStorageUlti.removeLoginInfor();
    }
    this.authenService.login(this.user).subscribe({
      next: res => {
        if (res.accessToken){
          LocalStorageUlti.saveAccessToken(res.accessToken),
            LocalStorageUlti.setAccount(res.account),
            LocalStorageUlti.setRole(res.role)
        this.messeage.success("Login success")
          if (res.role=="ROLE_EMPLOYEE"){
            this.router.navigate([`/auth/employees`])
          }
          else {
            this.router.navigate([`/auth/managers`])
          }
        }
      }, error: err => {
        this.messeage.error("Please enter account/password correct")
      }
    })
  }
}
