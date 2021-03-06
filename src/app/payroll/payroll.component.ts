import { HttpClient } from '@angular/common/http';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { ApiService } from '../service/api.service';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from './payroll.model';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { PaymentComponent } from '../payment/payment.component';
import { trim } from 'jquery';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  providers: [PayrollService, ApiService,DialogService, MessageService]
})
export class PayrollComponent implements OnInit,OnDestroy {
  payrollModelObj: payrollModel = new payrollModel();
  payrollForm!: FormGroup;
  employeeData: any=[];
  showAdd!: boolean;
  showUpdate!: boolean;
  processTemplates: any = [];
  showUpdateTitle!: boolean;
  showAddTitle!: boolean;
  basic: any;
  houseRentAllowance: any;
  mealAllowance: any;
  total!: any;
  ref!: DynamicDialogRef;
  hike!:any
  v: any;
 totalValue:any

  constructor(private formBuilder: FormBuilder,
    private payrollServices: PayrollService,
    private api: ApiService,
    public dialogService: DialogService,
    public messageService:MessageService) {
  }

  addButtonClickFunction() {
    this.payrollForm.reset();
    this.showUpdate = false;
    this.showAdd = true;
    this.showUpdateTitle = false;
    this.showAddTitle = true;
  }

  ngOnInit(): void {
    this.payrollForm = this.formBuilder.group({
      employeeName: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      // date: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      basic: this.formBuilder.control('', [Validators.required,]),
      // incentivePay: this.formBuilder.control('',[Validators.required]),
      houseRentAllowance: this.formBuilder.control('', [Validators.required]),
      mealAllowance: this.formBuilder.control('', [Validators.required]),


    });
    this.add1()
    this.getEmployees();
    this.getAllSalary();

  }




  get f(): { [key: string]: AbstractControl } {
    return this.payrollForm.controls;
  }
  postPayroll() {
    // alert("fucntion call");
    this.payrollModelObj.id = this.payrollForm.value.id;
    this.payrollModelObj.employeeName = this.payrollForm.value.employeeName;
    // this.payrollModelObj.date=this.payrollForm.value.date;
    this.payrollModelObj.basic = this.payrollForm.value.basic;
    // this.payrollModelObj.incentivePay=this.payrollForm.value.incentivePay;
    this.payrollModelObj.houseRentAllowance = this.payrollForm.value.houseRentAllowance;
    this.payrollModelObj.mealAllowance = this.payrollForm.value.mealAllowance;
    this.payrollModelObj.total = (this.basic+this.houseRentAllowance+this.mealAllowance);


    let cancel = document.getElementById("cancel");
    const adm = this.employeeData.findIndex((a:any)=>{
      console.log(a);
      this.hike=a.employeeName == this.payrollForm.value.employeeName
      return a.employeeName == this.payrollForm.value.employeeName
    });

    if(this.hike){
      let cid = this.employeeData[adm].id
      console.log(cid)
      this.employeeData[adm].status = 0
      console.log(this.employeeData);
      // this.payrollServices.updateData(cid,this.employeeData).subscribe(a=>{
      //   console.log(a)
      // })
    console.log(adm);
    }else{
      this.payrollServices.postData(this.payrollModelObj).subscribe(a => {

        console.log(a);
        alert("Record inserted successfully");
        cancel?.click(); this.payrollForm.reset();
       this.getAllSalary();
      })
  console.log(this.payrollForm);
   }
  }
  getAllSalary() {
    this.payrollServices.getData().subscribe(a => {
      this.employeeData = a;
      this.employeeData.map((data: any, i: any) => {
        const index = this.processTemplates.findIndex((empdata: { id: any; }) => empdata.id == data.employeeName);
        console.log(data.employeeName);

        console.log(this.processTemplates[index])

        if (index !== -1) {
          console.log(this.processTemplates[index]);
          this.employeeData[i]["empFirstName"] = this.processTemplates[index].firstname

        }
        else {
          this.employeeData[i]["empFirstName"] == ''
        }

        console.log(index, i)
      })
      console.log(this.employeeData)

    })
  }
  getEmployees() {

    this.api.getEmployees().subscribe(
      (res: any[]) => {
        console.log(res);
        this.processTemplates = res;
      }
    );
  }
  deletePayroll(arr: any) {
    this.payrollServices.deleteData(arr.id).subscribe(a => {
      alert("Record Deleted Succesfully");
      this.getAllSalary();
    })

  }
  updatePayroll(arr: any) {
    this.showUpdate = true;
    this.showAdd = false;

    this.showUpdateTitle = true;
    this.showAddTitle = false;
    this.payrollModelObj.id = arr.id;
    this.payrollForm.controls['employeeName'].setValue(arr.employeeName);
    // this.payrollForm.controls['date'].setValue(arr.date);
    this.payrollForm.controls['basic'].setValue(arr.basic);
    // this.payrollForm.controls['incentivePay'].setValue(arr.incentivePay);
    this.payrollForm.controls['houseRentAllowance'].setValue(arr.houseRentAllowance);
    this.payrollForm.controls['mealAllowance'].setValue(arr.mealAllowance);
    // this.payrollForm.controls['total'].setValue(arr.total);
  }
  updatePayrollDetails() {

    this.payrollModelObj.employeeName = this.payrollForm.value.employeeName;
    // this.payrollModelObj.date=this.payrollForm.value.date;
    this.payrollModelObj.basic = this.payrollForm.value.basic;
    // this.payrollModelObj.incentivePay=this.payrollForm.value.incentivePay;
    this.payrollModelObj.houseRentAllowance = this.payrollForm.value.houseRentAllowance;
    this.payrollModelObj.mealAllowance = this.payrollForm.value.mealAllowance;
    this.payrollModelObj.total = this.payrollForm.value.total;
    console.log(this.payrollForm.value.employeeName)
    // this.payrollServices.getData().subscribe(res => {


    // })
    this.payrollServices.updateData(this.payrollModelObj, this.payrollModelObj.id).subscribe(a => {
      // alert("Record updated Succesfully");

      let cancel = document.getElementById("cancel");

      cancel?.click();
      this.payrollForm.reset();
      this.getAllSalary();


    })
  }

  add1() {
    this.total = this.basic + this.houseRentAllowance + this.mealAllowance;
    // console.log("hi")
  }

edit(arr:any){
this.ref= this.dialogService.open(PaymentComponent,{
  data: arr,
  header:"PaySlip Of An Employee",
  width: "80%",
  height : '100%',
  contentStyle:{"max-height":"1000px","overflow":"auto"},
  baseZIndex:10000

});

this.ref.onClose.subscribe((payroll:payrollModel)=>{
  if(payroll){
    this.messageService.add({severity:"info", summary:'Payroll Selected', detail:payroll.employeeName})
  }
});


}
ngOnDestroy(): void {
  if(this.ref){
    this.ref.close();
  }
}

}
