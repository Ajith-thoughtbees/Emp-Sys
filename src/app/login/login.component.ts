import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { User } from './user';
@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';
  role : string = '';
  user : User = new User();
  roles : string[];
  loginForm!: FormGroup;
  submitted = false;

  constructor(private LoginService : LoginService, private route : Router, private formBuilder:FormBuilder ) {
    this.roles = [
      'Admin',
      'Employee'
    ]
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role:['',Validators.required]
  });
}
get f() { return this.loginForm.controls; }
login() {

  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }
  if (this.loginForm.valid) {
    if (this.loginForm.value.password === this.loginForm.value.password){

  this.LoginService.login(this.loginForm.value).subscribe(res => {

    if(res == null) {
      alert("Uername or password is wrong");
      this.ngOnInit();
    }else {
      console.log("Login successful");
      localStorage.setItem("empId",res.id);

      if(this.role == 'Employee') {
        this.route.navigate(['employee-dashboard']);
        (this.f['username'].value, this.f['password'].value == "empID")
      }

      if( this.role == 'Admin') {
        this.route.navigate(['dashboard']);
        (this.f['username'].value, this.f['password'].value == "Admin")
      }

    }

  }, err => {
    alert("Login failed");
    this.ngOnInit();
  })
}
  }
}
}

//  if (this.RegistrationForm.valid) {
//   if (this.RegistrationForm..value.password1 === this.RegistrationForm.value.password2) {
//     this.MyService.Register(this.RegistrationForm.value)
//       .subscribe(
//         (data) => {},
//         error => this.errorMessage = error
//       )
//   } else {
//     this.errorMessage = "cdscs";

