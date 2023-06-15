import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements  OnInit,OnDestroy{
  employeeList !: AccountResponse[];
  q:any;
  role=LocalStorageUlti.getRole();
  constructor(private studentService : EmployeeService,
              private router : Router
  ) {
  }
  ngOnInit(): void {

    this.listEmployee()
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
  listEmployee(){
    if(LocalStorageUlti.getRole()==='ROLE_EMPLOYEE'){
        this.router.navigate(['/auth/employees'])
    }
    this.studentService.getListEmployeeWithEmployee().subscribe(data =>
    this.employeeList=data)
  }
  searchManager(){
    this.studentService.searchEmployee(this.q).subscribe(data=>
      this.employeeList=data
    )
  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  ngOnDestroy(): void {
  }

}
