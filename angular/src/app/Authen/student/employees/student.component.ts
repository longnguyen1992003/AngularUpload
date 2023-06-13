import {Component, OnInit} from '@angular/core';
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
export class StudentComponent implements  OnInit{
  employeeList !: AccountResponse[];
  q:any;
  constructor(private studentService : EmployeeService,
              private router : Router
  ) {
  }
  ngOnInit(): void {

    this.listEmployee()
  }
  listEmployee(){
    if(LocalStorageUlti.getRole()==='ROLE_EMPLOYEE'){
        this.router.navigate(['/auth/employees'])
    }
    this.studentService.getListEmployeeWithEmployee().subscribe(data =>
    this.employeeList=data)
  }
  searchManager(){
    console.log("search")
    this.studentService.searchEmployee().subscribe(data=>
      this.employeeList=data
    )
  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

}
