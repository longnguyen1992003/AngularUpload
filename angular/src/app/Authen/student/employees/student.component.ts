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
  constructor(private studentService : EmployeeService,
              private router : Router
  ) {
  }
  ngOnInit(): void {
    this.listEmployee()
  }
  listEmployee(){
    this.studentService.getListEmployeeWithEmployee().subscribe(data =>
    this.employeeList=data)
  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

}
