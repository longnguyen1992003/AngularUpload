import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountResponse} from "../Authen/InforRespone";
import {EmployeeService} from "../service/employee.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {error} from "ng-packagr/lib/utils/log";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user:AccountResponse=new AccountResponse()
  constructor(private router:Router,
              private employeeService:EmployeeService,
              private nzMessageService:NzMessageService
  ) {
  }
  ngOnInit(): void {
  }

  backLogin(){
    this.router.navigate(['/auth/login'])
  }
  registerEmployee(){
    console.log("acs")
    this.employeeService.addEmployee(this.user).subscribe({
      next: ()=>{ this.nzMessageService.success("Register Success")
        this.router.navigate(['/login'])

      },error: err => {this.nzMessageService.error("Register Failed! Please try again")}
    })
  }
}
