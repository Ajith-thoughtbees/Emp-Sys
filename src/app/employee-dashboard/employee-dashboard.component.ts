import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  ID: any;
  arr:any=[];
  constructor(private api:ApiService,private http:HttpClient) { }

  ngOnInit(): void {
    this.fun()
  }
  fun(){

    this.http.get<any>("http://localhost:3000/register")

    .subscribe({

      next:(res)=>{

        const user =localStorage.getItem('empId');

        console.log(user);

        this.arr = res.find((a:any)=>{

          console.log(a);

          return a.id == user


        });

 console.log(this.arr);




      }})
  }
}
