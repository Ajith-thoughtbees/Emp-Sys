import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';
import { PayrollComponent } from './payroll/payroll.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  { path: '', redirectTo:"login",pathMatch:"full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'employee-dashboard', component:EmployeeDashboardComponent},
  { path: 'payroll', component:PayrollComponent},
  { path:'attendance', component:AttendanceComponent},
  {path:'users', component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
