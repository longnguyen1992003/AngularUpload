import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareDataService} from "../../../service/share-data.service";
import {NzMessageService} from "ng-zorro-antd/message";
// import * as path from "path";

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
              private nzMessageService:NzMessageService,
              private activatedRoute:ActivatedRoute
  ) {}
  role=LocalStorageUlti.getRole();
  size !: number;
  page !: number;

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
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size =Number(this.activatedRoute.snapshot.queryParamMap.get("size"));

    if (this.size==0){
      this.size=2
    }else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    }
    if (this.q) {
      this.router.navigateByUrl(`auth/managers?param=${this.q}&page=${this.page}&size=${this.size}` );
    }

    this.studentService.searchEmployee(this.q,this.page,this.size).subscribe(data =>
      this.managerList=data.content)
  }

  profile(){
    this.router.navigate(['auth/employee-update'])
  }
  listManager(){
    if(LocalStorageUlti.getRole()==='ROLE_EMPLOYEE'){
      this.router.navigate(['/auth/employees'])
    }

    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.page =Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size==0){
      this.size=2
    }else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.getListEmployeeWithManager(this.page,this.size).subscribe(data =>
      this.managerList=data.content)
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
