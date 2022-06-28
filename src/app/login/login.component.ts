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
  

  constructor(private LoginService : LoginService, private route : Router, private formBuilder:FormBuilder ) {
    this.roles = [
      'Admin',
      'Employee'
    ]
  }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  login() {
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.role = this.role;

    this.LoginService.login(this.user).subscribe(res => {

      if(res == null) {
        alert("Uername or password is wrong");
        this.ngOnInit();
      }else {
        console.log("Login successful");
        localStorage.setItem("empId",res.id);

        if(this.role == 'Employee') {
          this.route.navigate(['employee-dashboard']);
        }

        if( this.role == 'Admin') {
          this.route.navigate(['dashboard']);
        }

      }

    }, err => {
      alert("Login failed");
      this.ngOnInit();
    })

  }

}
