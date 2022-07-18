import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from '../payroll/payroll.model';
import {CalendarModule} from 'primeng/calendar';
import { FormBuilder, FormGroup,Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[PayrollService]
})
export class PaymentComponent implements OnInit {
  // employeeModelObj:EmployeeModel=new EmployeeModel();
  payrollModelObj : payrollModel = new payrollModel();
  noOfWorkingDays: any= 22 ;
  leaveDays: any=0;
  payslipForm!:FormGroup;
  pay:any;
  noOfActualWorking!:number;
  eariningBasic!:any;
  eariningMA!:any;
  eariningHA!:any;
  eariningNS!:any;
  date!:Date;
  yearpickerOptions: string[] = ['2021', '2022', '2023'];
  default: string = '2022';
  hike: any;
basic:any;
houseRentAllowance:any;
mealAllowance:any;
totalValue:any

  constructor(private payrollService:PayrollService,
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private formBuilder:FormBuilder) { }

  ngOnInit() {

 this.payslipForm = this.formBuilder.group({
  monthpicker:['',Validators.required],
  yearpicker:['default',Validators.required],
  leaveDay:[this.leaveDays,Validators.required],
  actualWorkingDay:['',Validators.required],
 })

    this.payrollService.getData().subscribe((res) => {
      this.payrollModelObj = res

     })
     this.pay=this.config.data
     console.log(this.pay.id)


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
  }

  postSalary(){
    let payslip: payrollModel = {
      monthpicker: this.monthpicker.value,
      yearpicker:this.yearpickerOptions[parseInt(this.yearpicker.value)],
      leaveDay: this.leaveDay.value,
      actualWorkingDay: this.payslipForm.value.actualWorkingDay,
      id: 0,
      employeeName: this.pay.employeeName,
      date: '',
      basic: parseFloat(this.eariningBasic).toFixed(0),
      houseRentAllowance: parseFloat(this.eariningHA).toFixed(0),
      mealAllowance: parseFloat(this.eariningMA).toFixed(0),
      status: 0,
      total: 0,
      netSalary: parseFloat(this.eariningNS).toFixed(0)
    }

this.payrollService.updateData(payslip,this.pay.id).subscribe(res=>{
  console.log(res)
})

  }


  public get monthpicker(): FormControl {
    return this.payslipForm.get('monthpicker') as FormControl;
  }
  public get yearpicker(): FormControl {
    return this.payslipForm.get('yearpicker') as FormControl;
  }
  public get leaveDay(): FormControl{
    return this.payslipForm.get('leaveDay') as FormControl;
  }
  public get actualWorkingDay():  FormControl{
    return this.payslipForm.get('noOfActualWorking') as FormControl
  }

}



