import {Component, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";
import {ShareDataService} from "../../../service/share-data.service";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit{
  managerList !: AccountResponse[];
  shareData !: AccountResponse
  q:any;
  constructor(private studentService : EmployeeService,
              private router: Router,
              private shareDataService : ShareDataService
  ) {}


  ngOnInit(): void {
    this.shareDataService.sharedData$
      .subscribe(sharedData => this.shareData = sharedData);
    console.log(this.shareData)
  this.listManager()
  }
  listManager(){
    if(LocalStorageUlti.getRole()==='ROLE_EMPLOYEE'){
      this.router.navigate(['/auth/employees'])
    }
    this.studentService.getListEmployeeWithManager().subscribe(data =>
      this.managerList=data)
  }
  searchManager(){
    console.log("search")
    this.studentService.searchEmployee().subscribe(data=>
    this.managerList=data
    )
  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }
}
