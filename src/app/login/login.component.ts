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
  constructor(private formBuilder: FormBuilder, private route: Router) { }


  registerForm: any = FormGroup;
  submitted = false;

  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      alert("Great!!");
    }

  }

  gotoDashboard() {
    this.route.navigate(['/dashboard']);
  }
  gotoRegister(){
    this.route.navigate(['/register']);
  }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(8)]],
    });


  }

}
