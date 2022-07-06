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
  noOfWorkingDays: number= 26 ;
  leaveDays: number=0;
  date9!: Date;
  date10!: Date;
  updateForm!:FormGroup;
  Pay:any=[];

  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
    actualDay: ['', Validators.required],
      leaveDay: ['', Validators.required]

  });
    //  this.payrollService.getData().pipe(payrolls => this.payrolls= payrolls)
    this.payrollService.getData().subscribe((res) => {
      this.payrolls = res

     });

     this.Pay=this.config.data
     console.log(this.Pay)
  }

  selectPayroll(payroll:payrollModel){
       this.ref.close(payroll)
  }
  leave(){
    if(this.noOfWorkingDays == 26){
      this.noOfWorkingDays = this.noOfWorkingDays - this.leaveDays
    }
    else{
      this.updateForm.reset()
      this.noOfWorkingDays = 26
    }

  }
}
