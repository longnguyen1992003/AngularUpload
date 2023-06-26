import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {Paging} from "../../Paging";
import {async, BehaviorSubject} from "rxjs";

// import * as path from "path";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit, OnDestroy {
  user: AccountResponse = new AccountResponse();
  idUpdate!:Number;
  q!: string;
  paging: Paging = new Paging();
  role = LocalStorageUlti.getRole();
  size !: number;
  page !: number;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()
  valueSize=5;
  sizeList:number[]=[5,10,15,20]
  constructor(private studentService: EmployeeService,
              private router: Router,
              private nzMessageService: NzMessageService,
              private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.studentService.getEmployeeCurrent().subscribe({
      next: user => {
        this.user = user;

      }
    })
    setTimeout(()=>{
      this.listManager(),
        0
    },5)
  }
  pageLength(event:Event){

    this.valueSize=Number((<HTMLInputElement>event.target).value);
    this.listManager()
    this.changePages(0)
    this.changePagesSearch(this.q,0)
  }
  home() {
    this.studentService.getEmployeeCurrent().subscribe({
      next: user => {
        this.user = user;

      }
    })
    if (this.user.role == "ROLE_EMPLOYEE") {
      this.router.navigate(['auth/employees'])
    }
    if (this.user.role == "ROLE_MANAGER") {
      this.router.navigate(['auth/managers'])
    }
  }

  previousAndNext(direction?: string) {
    this.changePages(direction == 'forward' ? Number(this.currentPageSubject.value + this.paging.currentPage + 1) : Number(this.currentPageSubject.value + this.paging.currentPage - 1))
  }

  previousAndNextSearch(direction: string, key: string) {
    this.changePagesSearch(key, direction == 'forward' ? Number(this.currentPageSubject.value + this.paging.currentPage + 1) : Number(this.currentPageSubject.value + this.paging.currentPage - 1))
  }


  changePagesSearch(key: string, page: number) {
    if (this.user.role === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 10
    } else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.searchEmployee(key, page, this.valueSize).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

  }

  chechNull(check: string) {
    if (check == null) {
      return false
    }
    return true
  }

  profile() {
    this.router.navigate(['auth/profile'])
  }

  detailEmployee(id:Number){
    this.router.navigateByUrl('auth/details/'+id);
    this.idUpdate=id;

  }

  listManager() {
    if (this.user.role === 'ROLE_MANAGER') {
      this.router.navigate(['/auth/managers'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.studentService.getListEmployeeWithManager(this.page, this.valueSize).subscribe({
      next: data => {
        this.paging.content = data.content,
          this.paging.totalPages = data.totalPages,
          this.paging.totalElements = data.totalElements,
          this.paging.currentPage = data.number,
          console.log(this.paging.content)

      }

    })
  }

  changePages(page: number) {
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 10
    } else {
      this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.getListEmployeeWithManager(page, this.valueSize).subscribe({
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
  reloadPage(){
    window.location.reload()
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
  }

  ngOnDestroy(): void {
  }

}
