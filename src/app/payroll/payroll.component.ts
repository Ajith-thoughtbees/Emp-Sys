import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { PayrollService } from '../service/payroll.service';
import { payroll } from './payroll.model';



@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  providers:[PayrollService]
})
export class PayrollComponent implements OnInit {

payrollForm: FormGroup;
payroll!: [];
Allowance!: payroll[];
payrollDisplay :any =[];

  constructor(  private formBuilder: FormBuilder, private payrollServices:PayrollService) 
  { this.payrollForm = formBuilder.group({});
    this.payrollServices }

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
      for (let arr of res) {
        this.payrollDisplay.push(arr);
      }

    });
    
  }
  addSalary() {
    let leave: payroll = {
      employeeName: (this.employeeName.value||{}),
      date: (this.date.value || {}),
      salary: (this.salary.value || {}),
      tds: (this.tds.value || {}),
      hra: (this.hra.value || {}),
      pf: (this.pf.value || {})

    }
    this.payrollServices.postData(leave).subscribe((res) => {
      this.Allowance.unshift(res);

    });
    {
      let controls:any[]=[];
      for (let i:number = 0; i < 5; ++i) {
        controls.push(this.formBuilder.group({
          v: i
        }))
      this.payrollForm = this.formBuilder.group({
        total: [{value: '', disabled: true}],
        arr: this.formBuilder.array(controls)
      });
        this.payrollForm.get('arr').valueChanges
        .subscribe((newVal) => {
          let total:number=0;
          newVal.forEach(e=>{
            total=total+parseInt(e.v)});
  
          this.payrollForm.get('total').patchValue(total,0)
  
        });
      }
    }

  }

  
  public get employeeName(): FormControl {
    return this.payrollForm.get('employeeName') as FormControl;
  }
  public get date(): FormControl {
    return this.payrollForm.get('date') as FormControl;
  }
  public get salary(): FormControl {
    return this.payrollForm.get('salary') as FormControl;
  }
  public get tds(): FormControl {
    return this.payrollForm.get('tds') as FormControl;
  }
  public get hra(): FormControl {
    return this.payrollForm.get('hra') as FormControl;
  }
  public get pf(): FormControl {
    return this.payrollForm.get('pf') as FormControl;
  }
  public get total(): FormControl {
    return this.payrollForm.get('total') as FormControl;
  }


}
