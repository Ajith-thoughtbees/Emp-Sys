import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AttendanceComponent } from './attendance/attendance.component';

import { LeaveComponent } from './leave/leave.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmpPayrollComponent } from './emp-payroll/emp-payroll.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    EmployeeComponent,
    PayrollComponent,
    AttendanceComponent,

    LeaveComponent,
    EmployeeDashboardComponent,
    EmpPayrollComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
