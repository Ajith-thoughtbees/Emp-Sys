import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { payroll } from './payroll.model';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

payrollForm: FormGroup;

  constructor(  private fb: FormBuilder,) { this.payrollForm = fb.group({}); }

  ngOnInit(): void {
    
  }

}
