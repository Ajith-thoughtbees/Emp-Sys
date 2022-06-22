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

  constructor(private formBuilder: FormBuilder, private route: Router, private http: HttpClient) { }


  loginForm: any = FormGroup;
  submitted = false;

  get f() { return this.loginForm.controls; }

  signIn() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.submitted) {
      // alert("Great!!");
    }
    this.http.get<any>("http://localhost:3000/register")
    .subscribe(res=>{
      const admin = res.find((a:any)=>{
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password && a.post==="Admin"
      });
      const user = res.find((a:any)=>{
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      });
      if(admin){
        // alert('Login Succesful');
        this.loginForm.reset()
      this.route.navigate(["dashboard"])
      }else{
        if(user){
          this.loginForm.reset()
      this.route.navigate(["employee-dashboard"])
        }else{
           alert("user not found")
        }

      }
    },err=>{
      alert("Something went wrong")
    })

  }

  gotoDashboard() {
    this.route.navigate(['/dashboard']);
  }
  gotoRegister(){
    this.route.navigate(['/register']);
  }


  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      password: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
    });


  }

}
