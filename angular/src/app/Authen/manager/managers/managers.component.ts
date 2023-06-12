import {Component, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit{
  managerList !: AccountResponse[];
  constructor(private studentService : EmployeeService,
              private router: Router
  ) {}


  ngOnInit(): void {
  this.listManager()
  }
  listManager(){
    this.studentService.getListEmployeeWithManager().subscribe(data =>
      this.managerList=data)
  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }
}
