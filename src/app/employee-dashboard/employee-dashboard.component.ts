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
  arr: any = [];
  user: any;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fun()

  }
  fun() {

    this.api.getEmployees()

      .subscribe({

        next: (res) => {

          this.user = localStorage.getItem('EmpId');

          console.log(this.user);

          this.user = res.find((a: any) => {

            if (a.id == this.user) {
              console.log(a);
              this.arr = a
              return a
            }
          });
          console.log(this.arr);
        }
      })
  }
}
