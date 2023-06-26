import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountResponse} from "../Authen/InforRespone";
import {EmployeeService} from "../service/employee.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {error} from "ng-packagr/lib/utils/log";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {count} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: AccountResponse = new AccountResponse()
  registerForm!: FormGroup;
  repeatPassword!: string;
  registerArray: any = {};
  message !: string;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private nzMessageService: NzMessageService,
  ) {
  }

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        firstName: new FormControl('',Validators.required),
        lastName : new FormControl('',Validators.required),
        emailId : new FormControl('',[Validators.required,Validators.pattern("(\\W|^)[\\w.+\\-]*@gmail\\.com(\\W|$)")]),
        account : new FormControl('',[Validators.required,Validators.minLength(10)]),
        password : new FormControl('',[Validators.required,Validators.minLength(8)]),
        repeatPassword: new FormControl('',[Validators.required]),
        dateOfBirth : new FormControl('',[Validators.required,this.dateValidator]),
        age : new FormControl('',[Validators.required,Validators.min(1),Validators.max(100)]),

      },[CustomValidators.MatchValidator('password', 'repeatPassword')])

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
  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true, error: true };
    } else if (control.value !== this.registerForm.value.password) {
      return { rePassword: true, error: true };
    }
    return {};
  };
  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('repeatPassword')?.touched
    );
  }


  backLogin() {
    this.router.navigate(['/auth/login'])
  }
  checkMatch(password:any,confirmPassword:any){
    return(formGroup:FormGroup)=>{
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl =formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['checkMatch']){
        return;
      }
      if (passwordControl.value!==confirmPasswordControl.value){
        confirmPasswordControl.setErrors({checkMatch:true});
      }
      else {
        confirmPasswordControl.setErrors( null);
      }
    }
  }
  registerEmployee() {

    this.employeeService.addEmployee(this.registerForm.value).subscribe({
      next: (data) => {
        for (const i in this.registerForm.controls) {
          this.registerForm.controls[i].markAsDirty();
          this.registerForm.controls[i].updateValueAndValidity();
        }

        if (data.message == "EmailExist") {
          this.nzMessageService.error("Email is exist")
          this.router.navigate(['/register'])
          return;
        }
        if (data.message == "AccountExist") {
          this.nzMessageService.error("Account is exist")
          this.router.navigate(['/register'])
          return;
        }
          this.nzMessageService.success("Register Success")
          this.router.navigate(['/login'])
      }, error: err => {
        this.nzMessageService.error("Register Failed! Please try again")
      }
    })
  }
}
export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
