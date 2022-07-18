import { Component, OnInit,OnDestroy } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PayrollService } from '../service/payroll.service';
import { payrollModel } from '../payroll/payroll.model';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-popup-pdf',
  templateUrl: './popup-pdf.component.html',
  styleUrls: ['./popup-pdf.component.css'],
  providers:[PayrollService]
})
export class PopupPdfComponent implements OnInit {
  ID: any;
  arr: any = [];
  user: any;
  pay: any
  payrollModelObj : payrollModel = new payrollModel();

  constructor(private payrollService : PayrollService, public ref:DynamicDialogRef,
    public config:DynamicDialogConfig) { }

  ngOnInit(): void {

    this.payrollService.getData().subscribe((res) => {
      this.payrollModelObj = res

     })
     this.pay=this.config.data
     console.log(this.pay.id)


  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Payslip.pdf');
    });
  }

}
