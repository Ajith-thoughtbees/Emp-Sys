import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { PayrollService } from '../service/payroll.service';
import {payroll }from '../payroll/payroll.model'

@Component({
  selector: 'app-emp-payroll',
  templateUrl: './emp-payroll.component.html',
  styleUrls: ['./emp-payroll.component.css'],
  providers:[PayrollService]
})
export class EmpPayrollComponent implements OnInit {
  

  
  constructor(private payrollServices:PayrollService) {
  
   }

  ngOnInit(): void {
   
  
  
 }
 
 
}