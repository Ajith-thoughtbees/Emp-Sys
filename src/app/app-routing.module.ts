import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpPayrollComponent } from './emp-payroll/emp-payroll.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PopupPdfComponent } from './popup-pdf/popup-pdf.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo:"login",pathMatch:"full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component:DashboardComponent},
  {path:'emp-payroll',component:EmpPayrollComponent},
  { path: 'employee-dashboard', component:EmployeeDashboardComponent},
  {path:'leave',component:LeaveComponent},
  { path: 'payroll', component:PayrollComponent},
  { path:'attendance', component:AttendanceComponent},
  {path:'payment',component:PaymentComponent},
  {path:'popup-pdf',component:PopupPdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
