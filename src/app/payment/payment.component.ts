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
  leaveDays: number=0;
  date!:any;
  updateForm!:FormGroup;
  pay:any;
  noOfActualWorking!:number;

  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
    actualDay: ['', Validators.required],
      leaveDay: ['', Validators.required],
      noOfActualWorking:['', Validators.required],
      date:['',Validators.required]
  });
    //  this.payrollService.getData().pipe(payrolls => this.payrolls= payrolls)
    this.payrollService.getData().subscribe((res) => {
      this.payrolls = res

     })

  }

  selectPayroll(payroll:payrollModel){
       this.ref.close(payroll)
  }
  leave(){
      this.noOfActualWorking = this.noOfWorkingDays - this.leaveDays
    console.log(this.noOfActualWorking);
    this.pay=this.config.data
     this.pay.eariningBasic = (this.pay.basic/this.noOfWorkingDays)*this.noOfActualWorking;
     this.pay.eariningBasic = parseFloat(this.pay.eariningBasic).toFixed(2);
     this.pay.eariningMA = (this.pay.mealAllowance/this.noOfWorkingDays)*this.noOfActualWorking;
     this.pay.eariningMA = parseFloat(this.pay.eariningMA).toFixed(2);
     this.pay.eariningHA = (this.pay.houseRentAllowance/this.noOfWorkingDays)*this.noOfActualWorking;
     this.pay.eariningHA = parseFloat(this.pay.eariningHA).toFixed(2);
    this.pay.eariningNS = (+this.pay.eariningBasic+this.pay.eariningHA+this.pay.eariningMA)
    this.pay.eariningNS = parseInt(this.pay.eariningNS).toFixed(2);
    console.log(this.pay.eariningNS)
  }


}
