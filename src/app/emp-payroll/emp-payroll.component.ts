import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from '../payroll/payroll.model';
import { ApiService } from '../service/api.service';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { PaymentComponent } from '../payment/payment.component';
import { PopupPdfComponent } from '../popup-pdf/popup-pdf.component';

@Component({
  selector: 'app-emp-payroll',
  templateUrl: './emp-payroll.component.html',
  styleUrls: ['./emp-payroll.component.css'],
  providers:[PayrollService,DialogService, MessageService]
})
export class EmpPayrollComponent implements OnInit {
  payrollForm: FormGroup;
  allowance :any =[];
  empId: any=[]
  ID: any;
  ref!: DynamicDialogRef;
  constructor(private payrollServices:PayrollService, private formBuilder: FormBuilder,public dialogService: DialogService, public messageService: MessageService) {
  this.allowance =[]
  this.payrollForm = formBuilder.group({});
   }

  ngOnInit(): void {
    // this.payrollForm = this.formBuilder.group({
    //   employeeName: this.formBuilder.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    //   date: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
    //   salary: this.formBuilder.control('',[Validators.required,]),
    //   tds: this.formBuilder.control('',[Validators.required]),
    //   hra: this.formBuilder.control('',[Validators.required]),
    //   pf : this.formBuilder.control('',[Validators.required]),
    //   total : this.formBuilder.control('',[Validators.required])
    // });
    this.payrollServices.getData().subscribe((res) => {
      this.allowance = res
      console.log(this.allowance)
    });



      this.payrollServices.getData().subscribe((res) => {
        let search = (obj: { id:any }) => obj.id === this.empId

        let check =this.allowance.findIndex(search);
        console.log(res);

       console.log(check);

    })
this.fun()
 }
 fun(){

  this.payrollServices.getData()

  .subscribe({

    next:(res)=>{

      const user = localStorage.getItem('empId');

      // console.log(user);
      this.ID = res.find((a:any)=>{

        if(a.id == user){

           return a

        }


      });
console.log(this.ID);
}})


}
show(arr:any){
  this.ref= this.dialogService.open(PopupPdfComponent,{
    data: arr,
    header:"PaySlip Of An Employee",
    width: "70%",
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


