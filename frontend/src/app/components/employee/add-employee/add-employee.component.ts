import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { APIs } from 'src/app/shared/APIs';
import { CrudHttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  isLogin: boolean = true;
  showCPass: boolean = false;
  showPass: boolean = false;
  constructor(private fb: FormBuilder, private httpService: CrudHttpService) { }

  ngOnInit(): void {
    this.initRegisterForm();
    this.initLoginForm();
  }
  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      password: ["", [Validators.required]],
      c_password: ["", [Validators.required]],
      agree: [false, [Validators.required]]
    });
    this.registerForm.valueChanges.subscribe(val => {
      console.log(this.registerForm);

    })
  }
  initLoginForm() {
    this.loginForm = this.fb.group({
      usernameEmail: ["", [Validators.required, this.validateUsernameEmail()]],
      password: ["", [Validators.required]]
    });
    this.loginForm.valueChanges.subscribe((ele) => {
      console.log(this.loginForm);

    })
  }

  validateUsernameEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if ((control.value && (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(control.value)
        || /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/.test(control.value)
        || (/^[A-z]*$/).test(control.value))) || control.value.length == 0) {
        return null;
      }
      return { 'invalidUsernameEmail': true };
    };
  }
  register() {
    var pass = this.registerForm.get('password')?.value;
    var cPass = this.registerForm.get('c_password')?.value;
    if (cPass == pass && cPass != '' && pass != "" && this.registerForm.valid && this.registerForm.get('agree')?.value) {
      this.httpService.post(APIs.EMPLOYEE_ACTION + "register", this.loginForm.value)
        .subscribe({
          next: (res) => {
            alert(res.msg);
          },
          error: (e) => {
            alert(e.msg);
            console.error(e);
          }
        });
    }

  }
  login() {
    this.httpService.post(APIs.EMPLOYEE_ACTION + "login", this.loginForm.value)
      .subscribe({
        next: (res) => {
          alert(res.msg);
        },
        error: (e) => {
          alert(e.msg);
          console.error(e);
        }
      });
  }

}
