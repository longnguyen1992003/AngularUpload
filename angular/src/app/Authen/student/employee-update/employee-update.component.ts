import {Component, OnInit} from '@angular/core';
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {AccountResponse} from "../../InforRespone";
import {success} from "ng-packagr/lib/utils/log";
import {NzMessageService} from "ng-zorro-antd/message";


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  user:AccountResponse = new  AccountResponse();
  role=LocalStorageUlti.getRole();
  constructor(private router: Router,
              private employeeService : EmployeeService,
              private nzMessageService:NzMessageService) {
  }
  ngOnInit(): void {
    this.getInfor();
    console.log(this.user)
  }
  home(){
    if (this.role=="ROLE_EMPLOYEE"){
    this.router.navigate(['auth/employees'])}
    if (this.role=="ROLE_MANAGER"){
      this.router.navigate(['auth/managers'])
    }
  }
  profile(){
      this.router.navigate(['auth/employee-update'])
  }
  getInfor(){
    this.employeeService.getEmployeeByAccount().subscribe(user =>
       this.user=user
    )
}
  updateInfor(){
    this.employeeService.updateEmployee(this.user).subscribe({
      next: res=> {
        this.nzMessageService.success("Update success")

      },error: err => {
        this.nzMessageService.error("Update Failed! Please try again")
      }

    })


  }
  logout() {
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }
}
