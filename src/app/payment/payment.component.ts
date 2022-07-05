import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from '../payroll/payroll.model';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[PayrollService]
})
export class PaymentComponent implements OnInit {

  payrolls! : payrollModel[];

  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig) { }

  ngOnInit() {
    //  this.payrollService.getData().pipe(payrolls => this.payrolls= payrolls)
    this.payrollService.getData().subscribe((res) => {
      this.payrolls = res

     });
  }

  selectPayroll(payroll:payrollModel){
       this.ref.close(payroll)
  }
}
