import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-login',
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';
  role : string = '';

  loginForm!: FormGroup;
  submitted = false;
  eId: any;

  constructor(private  api:ApiService , private route : Router, private formBuilder:FormBuilder ) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

  });
}
get f() { return this.loginForm.controls; }

login() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }
  this.api.getEmployees()

    .subscribe({

      next:(res)=>{

        const adm = res.find((a:any)=>{

          return a.username =="Admin" && a.password===this.loginForm.value.password

        });

        const emp = res.find((a:any)=>{

          this.eId=a.id

          return a.username===this.loginForm.value.username && a.password===this.loginForm.value.password



        });


        if(adm){

          alert(" Welcome admin..." )

        this.loginForm.reset();

        this.route.navigate(['/dashboard'])



      }

     else{

      if(emp){

        alert(" login is successed")

         console.log(this.eId);

         localStorage.setItem('EmpId', this.eId);

          this.loginForm.reset();

           this.route.navigate(['/employee-dashboard'])

      }



      }


    }})
  }
}
//   if (this.loginForm.valid) {
//     if (this.loginForm.value.password === this.loginForm.value.password){

//   this.api.getEmployees().subscribe(res => {

//     if(res == null) {
//       alert("Uername or password is wrong");
//       this.ngOnInit();
//     }else {
//       console.log("Login successful");
//       localStorage.setItem("empId",'');

//       if(this.role == 'Employee') {
//         this.route.navigate(['employee-dashboard']);
//         (this.f['username'].value, this.f['password'].value == "empID")
//       }

//       if( this.role == 'Admin') {
//         this.route.navigate(['dashboard']);
//         (this.f['username'].value, this.f['password'].value == "Admin")
//       }

//     }

//   }, err => {
//     alert("Login failed");
//     this.ngOnInit();
//   })
// }
//   }


//  if (this.RegistrationForm.valid) {
//   if (this.RegistrationForm..value.password1 === this.RegistrationForm.value.password2) {
//     this.MyService.Register(this.RegistrationForm.value)
//       .subscribe(
//         (data) => {},
//         error => this.errorMessage = error
//       )
//   } else {
//     this.errorMessage = "cdscs";

