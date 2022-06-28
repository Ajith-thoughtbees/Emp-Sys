import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators,AbstractControl } from '@angular/forms';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from './payroll.model';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  providers:[PayrollService]
})
export class PayrollComponent implements OnInit {
payrollModelObj:payrollModel=new payrollModel();
 payrollForm !: FormGroup;
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  showUpdateTitle!:boolean;
  showAddTitle!:boolean;

  constructor( private formBuilder:FormBuilder,private payrollServices:PayrollService)
  {
     }
     addButtonClickFunction()
    {
      this.payrollForm.reset();
      this.showUpdate=false;
      this.showAdd=true;

      this.showUpdateTitle=false;
      this.showAddTitle=true;
    }

  ngOnInit(): void {
    this.payrollForm = this.formBuilder.group({
      employeeName: this.formBuilder.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
      date: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      salary: this.formBuilder.control('',[Validators.required,]),
      tds: this.formBuilder.control('',[Validators.required]),
      hra: this.formBuilder.control('',[Validators.required]),
      pf : this.formBuilder.control('',[Validators.required]),


    });

    this.getAllSalary();

}
get f(): { [key: string]: AbstractControl } {
  return this.payrollForm.controls;
}
postPayroll(){
  // alert("fucntion call");
  this.payrollModelObj.id=this.payrollForm.value.id ;

    this.payrollModelObj.employeeName=this.payrollForm.value.employeeName;
    this.payrollModelObj.date=this.payrollForm.value.date;
    this.payrollModelObj.salary=this.payrollForm.value.salary;
    this.payrollModelObj.tds=this.payrollForm.value.tds;
    this.payrollModelObj.hra=this.payrollForm.value.hra;
    this.payrollModelObj.pf = this.payrollForm.value.pf;

    let cancel=document.getElementById("cancel");
    this.payrollServices.postData(this.payrollModelObj).subscribe(a=> {

      console.log(a);
      alert("Record inserted successfully");
      cancel?.click();this.payrollForm.reset();
      this.getAllSalary();
    })
   }
   getAllSalary(){
    this.payrollServices.getData().subscribe(a=>{
      this.employeeData=a;
    })


  }
  deletePayroll(arr:any){

    this.payrollServices.deleteData(arr.id).subscribe(a=>{
      alert("Record Deleted Succesfully");
      this.getAllSalary();
    })

  }
  updatePayroll(arr:any){
    this.showUpdate=true;
    this.showAdd=false;

    this.showUpdateTitle=true;
    this.showAddTitle=false;
    this.payrollModelObj.id=arr.id;
    this.payrollForm.controls['employeeName'].setValue(arr.employeeName);
    this.payrollForm.controls['date'].setValue(arr.date);
    this.payrollForm.controls['salary'].setValue(arr.salary);
    this.payrollForm.controls['tds'].setValue(arr.tds);
    this.payrollForm.controls['hra'].setValue(arr.hra);
    this.payrollForm.controls['pf'].setValue(arr.pf);
  }
  updatePayrollDetails(){

    this.payrollModelObj.employeeName=this.payrollForm.value.employeeName;
    this.payrollModelObj.date=this.payrollForm.value.date;
    this.payrollModelObj.salary=this.payrollForm.value.salary;
    this.payrollModelObj.tds=this.payrollForm.value.tds;
    this.payrollModelObj.hra=this.payrollForm.value.hra;
    this.payrollModelObj.pf=this.payrollForm.value.pf;

    this.payrollServices.updateData(this.payrollModelObj,this.payrollModelObj.id).subscribe(a=>{
      // alert("Record updated Succesfully");

    let cancel=document.getElementById("cancel");

      cancel?.click();
      this.payrollForm.reset();
      this.getAllSalary();
    })
  }
}

