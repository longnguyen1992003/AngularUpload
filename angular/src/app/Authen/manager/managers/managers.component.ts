import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareDataService} from "../../../service/share-data.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Paging} from "../../Paging";
import {BehaviorSubject} from "rxjs";

// import * as path from "path";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit, OnDestroy {
  managerList !: AccountResponse[];
  shareData !: string;
  q!: string;
  paging: Paging = new Paging();
  role = LocalStorageUlti.getRole();
  size !: number;
  page !: number;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()

  constructor(private studentService: EmployeeService,
              private router: Router,
              private shareDataService: ShareDataService,
              private nzMessageService: NzMessageService,
              private activatedRoute: ActivatedRoute
  ) {
  }



  ngOnInit(): void {
    this.shareDataService.sharedData$
      .subscribe(sharedData => this.shareData = sharedData);
    console.log(this.shareDataService.sharedData$.subscribe())
    this.listManager()
  }

  home() {
    if (this.role == "ROLE_EMPLOYEE") {
      this.router.navigate(['auth/employees'])
    }
    if (this.role == "ROLE_MANAGER") {
      this.router.navigate(['auth/managers'])
    }
  }
  previousAndNext(direction?:string) {
    this.changePages(direction=='forward'?Number(this.currentPageSubject.value+this.paging.currentPage+1) : Number(this.currentPageSubject.value+this.paging.currentPage-1))
  }
  previousAndNextSearch(direction:string,key:string) {
    this.changePagesSearch(key,direction=='forward'?Number(this.currentPageSubject.value+this.paging.currentPage+1) : Number(this.currentPageSubject.value+this.paging.currentPage-1))
  }



  checkPageMin(){
    if (this.paging.totalPages===1){
      return false;
    }
    if (this.paging.currentPage===0){
      return true
    }
    return  false;
  }
    checkPageMax(){
      if (this.paging.totalPages===1){
        return false;
      }
    if (this.paging.currentPage===this.paging.totalPages-1){
      return true
    }
    return  false;
  }

  changePagesSearch(key:string,page: number) {
    console.log("changePagesSearch")
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 2
    } else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.searchEmployee(key,page, this.size).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

  }
  chechNull(check:string){
    if (check==null){
      return false
    }
    return true
  }
  profile() {
    this.router.navigate(['auth/employee-update'])
  }

  listManager() {
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }

    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 2
    } else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.getListEmployeeWithManager(this.page, this.size).subscribe({
      next: data => {
        this.paging.content = data.content,
          this.paging.totalPages = data.totalPages,
          this.paging.totalElements = data.totalElements,
          this.paging.currentPage = data.number,
          console.log(this.paging.content)

      }

    })
  }
  changePages(page:number){
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 2
    } else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.getListEmployeeWithManager(page, this.size).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

  }

  logout() {
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  deleteEmployee(account: string) {
    this.studentService.deletedEmployee(account).subscribe(
      {
        next: res => {
          this.nzMessageService.success("Deleted Success")
        }, error: () => {
          this.nzMessageService.error("Deleted Failed!")
        }
      }
    )
    window.location.reload()
  }

  ngOnDestroy(): void {
  }

}
