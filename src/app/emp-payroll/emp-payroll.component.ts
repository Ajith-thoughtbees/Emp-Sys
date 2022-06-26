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
  payrollForm: FormGroup;
  allowance :any =[];
  empId: any=[]
  
  constructor(private payrollServices:PayrollService, private formBuilder: FormBuilder) {
  this.allowance =[]
  this.payrollForm = formBuilder.group({});
   }

  ngOnInit(): void {
    this.payrollForm = this.formBuilder.group({
      employeeName: this.formBuilder.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
      date: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      salary: this.formBuilder.control('',[Validators.required,]),
      tds: this.formBuilder.control('',[Validators.required]),
      hra: this.formBuilder.control('',[Validators.required]),
       pf : this.formBuilder.control('',[Validators.required]),
      total : this.formBuilder.control('',[Validators.required])
    });
    this.payrollServices.getData().subscribe((res) => {
      this.allowance = res
    });
    emp()
    {
      this.payrollServices.getData().subscribe((res) => {
        let search = (obj: { id:any }) => obj.id === this.empId
  
        let check =this.allowance.findIndex(search);
  
        console.log(check);
       
    })}
 
 }



 
}

function emp() {
  throw new Error('Function not implemented.');
}
