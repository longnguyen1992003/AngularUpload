import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {Paging} from "../../Paging";
import {async, BehaviorSubject} from "rxjs";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  user: AccountResponse = new AccountResponse();
  paging: Paging = new Paging();
  q: any;
  size !: number;
  page !: number;
  role = LocalStorageUlti.getRole();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()
  path!: any;
  valueSize=5;
  sizeList:number[]=[5,10,15,20]

  constructor(private studentService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location
  ) {
  }

  ngOnInit(): void {

    this.studentService.getEmployeeCurrent().subscribe({
      next: user => {
        this.user = user
        this.user.role = user.role

      }
    })
    setTimeout(() => {
      this.listEmployee(),
        0
    }, 5)

  }


  chechNull(check: string) {
    if (check == null) {
      return false
    }
    return true
  }

  home() {
    this.studentService.getEmployeeCurrent().subscribe({
      next: user => {
        this.user = user
      }
    })
    if (this.user.role == "ROLE_EMPLOYEE") {
      this.router.navigate(['auth/employees'])
    }
    if (this.user.role == "ROLE_MANAGER") {
      this.router.navigate(['auth/managers'])
    }
  }

  profile() {
    this.router.navigate(['auth/profile'])
  }

  changePagesSearch(key: string, page: number) {
    if (this.user.role === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }

    if (this.size == 0) {
      this.size = 5
      console.log("2")
    } else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    }
    this.studentService.searchEmployee(key, page, this.valueSize).subscribe({
        next: data => {
          console.log()
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number
          this.paging.size = data.size

        }

      }
    )

  }

  changePages(page: number) {


    if (this.user.role === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    }
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    if (this.size == 0) {
      this.size = 2
      console.log("changePages")
    } else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    }
    this.studentService.getListEmployeeWithEmployee(page, this.valueSize).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )

  }

  previousAndNext(direction?: string) {
    this.changePages(direction == 'forward' ? Number(this.currentPageSubject.value + this.paging.currentPage + 1) : Number(this.currentPageSubject.value + this.paging.currentPage - 1))
  }

  previousAndNextSearch(direction: string, key: string) {
    this.changePagesSearch(key, direction == 'forward' ? Number(this.currentPageSubject.value + this.paging.currentPage + 1) : Number(this.currentPageSubject.value + this.paging.currentPage - 1))
  }


  listEmployee() {
    if (this.user.role === 'ROLE_EMPLOYEE') {
      this.router.navigate(['/auth/employees'])
    } else {
      this.router.navigate(['/auth/employees'])
    }

    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));


    this.studentService.getListEmployeeWithEmployee(this.page, this.valueSize).subscribe({
        next: data => {
          this.paging.content = data.content,
            this.paging.totalPages = data.totalPages,
            this.paging.totalElements = data.totalElements,
            this.paging.currentPage = data.number

        }

      }
    )
  }
  pageLength(event:Event){

    this.valueSize=Number((<HTMLInputElement>event.target).value);
    this.listEmployee()
    this.changePages(0)
    this.changePagesSearch(this.q,0)
  }

  logout() {
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  ngOnDestroy(): void {
  }


}
