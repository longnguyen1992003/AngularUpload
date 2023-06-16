import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {AuthenticationService} from "../../../service/authentication.service";
import {EmployeeService} from "../../../service/employee.service";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {ActivatedRoute, Router} from "@angular/router";
import {Paging} from "../../Paging";
import {async} from "rxjs";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements  OnInit,OnDestroy{

  paging:Paging = new Paging();
  listPage !: number[]
  q:any;
  size !: number;
  page !: number;
  role=LocalStorageUlti.getRole();

  constructor(private studentService : EmployeeService,
              private router : Router,
              private activatedRoute:ActivatedRoute
  ) {
  }

  ngOnInit(): void {


     this.listEmployee()
     console.log(this.paging.totalPages+" Gia tri trong oninit")
  }
  home(){
    if (this.role=="ROLE_EMPLOYEE"){
      this.router.navigate(['auth/employees'])}
    if (this.role=="ROLE_MANAGER"){
      this.router.navigate(['auth/managers'])
    }
  }
  profile(){
    this.router.navigate(['auth/employee-update'])
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
          this.paging.currentPage = data.number,
          console.log(this.paging.totalPages+" Gia tri trong ham goi")
      }

    }

    )
  }
  addListPage(loop:number){

  }
  searchEmployee(){
    this.page = Number(this.activatedRoute.snapshot.queryParamMap.get("page"));
    this.size =Number(this.activatedRoute.snapshot.queryParamMap.get("size"));

    if (this.size==0){
      this.size=2
    }else {
      this.size = Number(this.activatedRoute.snapshot.queryParamMap.get("size"));
    }
    if (this.q) {
      this.router.navigateByUrl(`auth/employees?param=${this.q}&page=${this.page}&size=${this.size}` );
    }

    this.studentService.searchEmployee(this.q,this.page,this.size).subscribe({next: data=>(
    this.paging.content = data.content,
      this.paging.totalPages=data.totalPages,
      this.paging.totalElements=data.totalElements,
      this.paging.currentPage=data.number,
      console.log(this.paging.totalPages)

        )
  }
    )

  }
  logout(){
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  ngOnDestroy(): void {
  }

}
