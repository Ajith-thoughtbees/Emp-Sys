import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from '../payroll/payroll.model';
import {CalendarModule} from 'primeng/calendar';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[PayrollService]
})
export class PaymentComponent implements OnInit {

  payrolls! : payrollModel[];
  noOfWorkingDays: any= 22 ;
  leaveDays: any;
  payslipForm!:FormGroup;
  pay:any;
  noOfActualWorking!:number;
  eariningBasic!:any;
  eariningMA!:any;
  eariningHA!:any;
  eariningNS!:any;
  date!:Date;
  year: string[] = ['2021', '2022', '2023'];
  default: string = '2022';



  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private formBuilder:FormBuilder) { }

  ngOnInit() {

 this.payslipForm = this.formBuilder.group({
  monthpicker:['',Validators.required],
  yearpicker:['',Validators.required,Validators.pattern('^[^A-Za-z]+$'),Validators.minLength(1)],
  leaveDay:['',Validators.required],
  noOfActualWorking:['',Validators.required]
 })
    //  this.payrollService.getData().pipe(payrolls => this.payrolls= payrolls)
    this.payrollService.getData().subscribe((res) => {
      this.payrolls = res

     })
     this.pay=this.config.data
     console.log(this.pay)
  }
  get f() { return this.payslipForm.controls; }

  selectPayroll(payroll:payrollModel){
       this.ref.close(payroll)
  }
  leave(){
      this.noOfActualWorking = this.noOfWorkingDays - this.leaveDays
    // console.log(this.noOfActualWorking);

     this.eariningBasic = ((this.pay.basic/this.noOfWorkingDays)*this.noOfActualWorking).toFixed(2);

     this.eariningMA = ((this.pay.mealAllowance/this.noOfWorkingDays)*this.noOfActualWorking).toFixed(2);

     this.eariningHA = ((this.pay.houseRentAllowance/this.noOfWorkingDays)*this.noOfActualWorking).toFixed(2);

    this.eariningNS = (parseFloat(this.eariningBasic) + parseFloat(this.eariningMA) + parseFloat(this.eariningHA)).toFixed(2)

    // console.log(this.pay.eariningNS)

    // console.log();

// this.payrollService.postData(this.payslipForm.value).subscribe(res=>{
//   console.log(res)
// })


  }

}

