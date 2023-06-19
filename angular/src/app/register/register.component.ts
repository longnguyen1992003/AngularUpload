import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountResponse} from "../Authen/InforRespone";
import {EmployeeService} from "../service/employee.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {error} from "ng-packagr/lib/utils/log";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user:AccountResponse=new AccountResponse()
  registerForm!: FormGroup;
  repeatPassword!:string;
  registerArray:any={};
  message !: string;
  constructor(private router:Router,
              private employeeService:EmployeeService,
              private nzMessageService:NzMessageService,
              private formBuilder:FormBuilder
  ) {
  }
  ngOnInit(): void {

  }

  backLogin(){
    this.router.navigate(['/auth/login'])
  }
  registerEmployee(){

    this.employeeService.addEmployee(this.user).subscribe({
      next: (data)=>{
          if (data.message=="EmailExist"){
            this.nzMessageService.error("Email is exist")
            this.router.navigate(['/register'])
          }
        if (data.message=="AccountExist"){
          this.nzMessageService.error("Account is exist")
          this.router.navigate(['/register'])
        }
        if (data.message=null){
          this.nzMessageService.success("Register Success")
          this.router.navigate(['/login'])
        }


      },error: err => {
        this.nzMessageService.error("Register Failed! Please try again")}
    })
  }
}
