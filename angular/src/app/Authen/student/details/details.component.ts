import {Component, OnInit} from '@angular/core';
import {AccountResponse} from "../../InforRespone";
import {LocalStorageUlti} from "../../../ulti/local-storage-ulti";
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Location} from "@angular/common";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  user: AccountResponse = new AccountResponse();
  role = LocalStorageUlti.getRole();
  updateForm!:FormGroup;
  idEmployee!:number;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private nzMessageService: NzMessageService,
              private location: Location,
              private activatedRoute:ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.idEmployee=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.updateForm = new FormGroup({
      firstName: new FormControl('',),
      lastName : new FormControl('',),
      emailId : new FormControl('',[Validators.pattern("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)")]),
      account : new FormControl('',[Validators.minLength(10)]),
      password : new FormControl('',[Validators.minLength(8)]),
      dateOfBirth : new FormControl('',[Validators.required,this.dateValidator]),
      age : new FormControl('',[Validators.min(1),Validators.max(100)]),
    })
    this.getInfor();
  }
  dateValidator = (control: UntypedFormControl): { [s: string]: boolean } => {

    if (!control.value){
      return {}
    }else
    if (new Date(control.value).valueOf()> new Date().valueOf()) {
      return {date: true, error: true};
    }
    return {};
  };
  home() {
      this.router.navigate(['auth/managers'])
  }

  profile() {
    this.router.navigate(['auth/profile'])
  }

  getInfor() {
    this.employeeService.getEmployeeUpdate(this.idEmployee).subscribe({
      next: user => {
        console.log(this.idEmployee)
        this.user=user


      }
    })
  }

  updateInfor() {
    this.employeeService.updateDetailsEmployee(this.updateForm.value,this.idEmployee).subscribe({
      next: data => {
        if (data.message == "EmailExist") {
          this.nzMessageService.error("Email is exist")
          this.router.navigate(['/profile'])
          return;
        }
        if (data.message == "AccountExist") {
          this.nzMessageService.error("Account is exist")
          this.router.navigate(['/profile'])
          return;
        }
        this.nzMessageService.success("Update success")

      }, error: err => {
        this.nzMessageService.error("Update Failed! Please try again")
      }

    })


  }

  logout() {
    LocalStorageUlti.removeLoginInfor()
    this.router.navigate(['/auth/login']);

  }

  protected readonly String = String;
}
