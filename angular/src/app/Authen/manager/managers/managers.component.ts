import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {Router} from "@angular/router";
import {ShareDataService} from "../../../service/share-data.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit,OnDestroy{
  managerList !: AccountResponse[];
  shareData !: string;
  q!:string;
  constructor(private studentService : EmployeeService,
              private router: Router,
              private shareDataService : ShareDataService,
              private nzMessageService:NzMessageService
  ) {}
  role=LocalStorageUlti.getRole();

  ngOnInit(): void {
    this.shareDataService.sharedData$
      .subscribe(sharedData => this.shareData = sharedData);
    console.log(this.shareDataService.sharedData$.subscribe())
  this.listManager()
  }
  home(){
    if (this.role=="ROLE_EMPLOYEE"){
      this.router.navigate(['auth/employees'])}
    if (this.role=="ROLE_MANAGER"){
      this.router.navigate(['auth/managers'])
    }
  }
  search() {
    console.log(this.q)
    if (this.q) {
      this.router.navigateByUrl('auth/managers?param=' + this.q);
    }
    this.listEmployeeBySearch()
  }
  listEmployeeBySearch(){
    this.studentService.searchEmployee(this.q).subscribe(data =>
      this.managerList=data)
  }

  profile(){
    this.router.navigate(['auth/employee-update'])
  }
  listManager(){
    if(LocalStorageUlti.getRole()==='ROLE_EMPLOYEE'){
      this.router.navigate(['/auth/employees'])
    }
    this.studentService.getListEmployeeWithManager().subscribe(data =>
      this.managerList=data)
  }

  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }
  deleteEmployee(account:string){
    this.studentService.deletedEmployee(account).subscribe(
      {next: res => {
        this.nzMessageService.success("Deleted Success")
        },error:()=>{
        this.nzMessageService.error("Deleted Failed!")
        }}
    )
    window.location.reload()
  }

  ngOnDestroy(): void {
  }

}
