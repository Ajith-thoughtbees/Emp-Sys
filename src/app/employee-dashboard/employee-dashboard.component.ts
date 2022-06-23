import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  ID: any;
  arr=[];
  constructor(private api:ApiService,) { }

  ngOnInit(): void {
    this.fun()
  }
  fun(){

    this.api.getEmployees()

    .subscribe({

      next:(res)=>{

        const user = localStorage.getItem('empId');

        console.log(user);
        this.ID = res.find((a:any)=>{

          if(a.id == user){

             return a

          }


        });
console.log(this.ID);




      }})
  }
}
