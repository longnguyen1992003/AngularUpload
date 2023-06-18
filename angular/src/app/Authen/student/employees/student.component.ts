import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {Paging} from "../../Paging";
import {async, BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  paging: Paging = new Paging();
  q: any;
  size !: number;
  page !: number;
  role = LocalStorageUlti.getRole();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()
  constructor(private studentService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.listEmployee()
  }
  chechNull(check:string){
    if (check==null){
      return false
    }
    return true
  }

  home() {
    if (this.role == "ROLE_EMPLOYEE") {
      this.router.navigate(['auth/employees'])
    }
    if (this.role == "ROLE_MANAGER") {
      this.router.navigate(['auth/managers'])
    }
  }

  profile() {
    this.router.navigate(['auth/employee-update'])
  }

  changePagesSearch(key:string,page: number) {
    console.log("changePagesSearch")
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.page == 0) {
      this.page = 2
    } else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.searchEmployee(key,page, this.page).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

  }
  changePages(page: number) {
    console.log("changePages")
    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.page == 0) {
      this.page = 2
    } else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }
    this.studentService.getListEmployeeWithEmployee(page, this.page).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

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

  listEmployee() {

    if (LocalStorageUlti.getRole() === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.page == 0) {
      this.page = 2
    } else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    }

    this.studentService.getListEmployeeWithEmployee(this.size, this.page).subscribe({
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

  ngOnDestroy(): void {
  }

  protected readonly isFinite = isFinite;
}
