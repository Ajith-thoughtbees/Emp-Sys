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
  date9!: Date;
  updateForm!:FormGroup;
  Pay:any;
  noOfActualWorking!:number;

  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
    actualDay: ['', Validators.required],
      leaveDay: ['', Validators.required],
      noOfActualWorking:['', Validators.required]

  });
    //  this.payrollService.getData().pipe(payrolls => this.payrolls= payrolls)
    this.payrollService.getData().subscribe((res) => {
      this.payrolls = res

     })
     console.log(this.Pay)
  }

  selectPayroll(payroll:payrollModel){
       this.ref.close(payroll)
  }
  leave(){
      this.noOfActualWorking = this.noOfWorkingDays - this.leaveDays
    console.log(this.noOfActualWorking);
    this.Pay=this.config.data
     this.Pay.eariningBasic = (this.Pay.basic/this.noOfWorkingDays)*this.noOfActualWorking;
     this.Pay.eariningBasic = parseFloat(this.Pay.eariningBasic).toFixed(2);
     this.Pay.eariningMA = (this.Pay.mealAllowance/this.noOfWorkingDays)*this.noOfActualWorking;
     this.Pay.eariningMA = parseFloat(this.Pay.eariningMA).toFixed(2);
     this.Pay.eariningHA = (this.Pay.houseRentAllowance/this.noOfWorkingDays)*this.noOfActualWorking;
     this.Pay.eariningHA = parseFloat(this.Pay.eariningHA).toFixed(2);
    this.Pay.eariningNS = (+this.Pay.eariningBasic+this.Pay.eariningHA+this.Pay.eariningMA)
    this.Pay.eariningNS = parseInt(this.Pay.eariningNS).toFixed(2);
  }


}
