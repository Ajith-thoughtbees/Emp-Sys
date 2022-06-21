import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private formbuilder:FormBuilder,private http:HttpClient, private route: Router) { }

  registerForm: any = FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }
  signUp() {


    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      // alert("Great!!");
    }
    this.http.post<any>("http://localhost:3000/register",this.registerForm.value)
    .subscribe(res=>{

      this.registerForm.reset()
      this.route.navigate(["login"])
    },err=>{
      alert("Something went wrong")
    })
  }
  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
    });
  }

}
