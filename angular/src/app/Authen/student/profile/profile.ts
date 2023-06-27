import {Component, OnInit} from '@angular/core';
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {AccountResponse} from "../../InforRespone";
import {success} from "ng-packagr/lib/utils/log";
import {NzMessageService} from "ng-zorro-antd/message";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Form, FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: AccountResponse = new AccountResponse();
  role = LocalStorageUlti.getRole();
  updateForm!:FormGroup;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private nzMessageService: NzMessageService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      firstName: new FormControl('',Validators.pattern("^[a-zA-Z ]*$")),
      lastName : new FormControl('',Validators.pattern("^[a-zA-Z ]*$")),
      emailId : new FormControl('',[Validators.pattern("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)")]),
      account : new FormControl('',[Validators.minLength(10)]),
      password : new FormControl('',[Validators.minLength(8)]),
      dateOfBirth : new FormControl('',[Validators.required,this.dateValidator]),
      age : new FormControl('',[Validators.min(1),Validators.max(100)]),
    })
    this.getInfor();
  }
  dateValidator = (control: UntypedFormControl): { [s: string]: boolean } => {

    if (!control.value){
      return {}
    }else
    if (new Date(control.value).valueOf()> new Date().valueOf()) {
      return {date: true, error: true};
    }
    return {};
  };
  home() {

    if (this.user.role == "ROLE_EMPLOYEE") {
      this.router.navigate(['auth/employees'])
    }
    if (this.user.role == "ROLE_MANAGER") {
      this.router.navigate(['auth/managers'])
    }
  }

  profile() {
    this.router.navigate(['auth/profile'])
  }

  getInfor() {
    this.employeeService.getEmployeeCurrent().subscribe({
      next: user => {
        this.user=user
        console.log(this.user.dateOfBirth)

      }
    })
  }

  updateInfor() {
    this.employeeService.updateEmployee(this.updateForm.value).subscribe({
      next: data => {
        if (data.message == "EmailExist") {
          this.nzMessageService.error("Email is exist")
          this.router.navigate(['/profile'])
          return;
        }
        if (data.message == "AccountExist") {
          this.nzMessageService.error("Account is exist")
          this.router.navigate(['/profile'])
          return;
        }
        this.nzMessageService.success("Update success")

      }, error: err => {
        this.nzMessageService.error("Update Failed! Please try again")
      }

    })


  }

  logout() {
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  protected readonly String = String;

}
