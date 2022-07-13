import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators,AbstractControl } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LeaveServiceService } from '../service/leave-service.service';
import { attendance } from './attendance.model';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  providers:[LeaveServiceService],
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
   Accepted!:Boolean;
   Declined!:Boolean;
  leaveForm : FormGroup;
  absent: attendance[];
  absenteesToDisplay: attendance[];
  LeaveTypeOptions = [
    'Casual leave',
    'Sick leave',
    'Maternity leave',
    'Loss of pay'
  ];
  submitted = false;
  State!:any
  minDate!: Moment;
  maxDate!: Moment;
  status:any;
  arr: any = [];

  constructor(private formBuilder:FormBuilder,private leaveService:LeaveServiceService) {
     this.leaveForm = formBuilder.group({});
      this.absent =[];
    this.absenteesToDisplay = this.absent;
}



ngOnInit(): void {

    this.getleaveDetails();
    this.leaveForm = this.formBuilder.group({
      leaveType: this.formBuilder.control('',[Validators.required,]),
      leaveReason: this.formBuilder.control('',[Validators.required,]),
      dateFrom: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      dateTo: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
     comment: this.formBuilder.control('')

    })

    const currentYear = moment().year();
    this.minDate = moment([currentYear - 1, 0, 1]);
    this.maxDate = moment([currentYear + 1, 11, 31]);


  }
  get f(): { [key: string]: AbstractControl } {
    return this.leaveForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.leaveForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.leaveForm.value, null, 2));
  }

  getleaveDetails(){
    this.leaveService.getAttendance().subscribe((res) => {
      // for (let emp of res) {
        // this.absent.push(emp);
      // }
      this.absenteesToDisplay = res;
      //arry filter with appliedby local storage id

    });
  }
  addLeave() {
    //appplied by
    let applied_by = localStorage.getItem('empId') ? localStorage.getItem('empId') : 0;
    let leave: attendance = {
      leaveReason: (this.leavereason.value||{}),
      leaveType: this.LeaveTypeOptions[parseInt(this.leavetype.value)],
      dateFrom: (this.datefrom.value || {}),
      dateTo: (this.dateto.value || {}),
      status: 0,


    }
    this.leaveService.postAttendance(leave).subscribe((res) => {
      this.absent.unshift(res);
      //alert message

      this.getleaveDetails();
    });

  }


  public get leavereason(): FormControl {
    return this.leaveForm.get('leaveReason') as FormControl;
  }
  public get leavetype(): FormControl {
    return this.leaveForm.get('leaveType') as FormControl;


  }
  public get datefrom(): FormControl {
    return this.leaveForm.get('dateFrom') as FormControl;
  }
  public get dateto(): FormControl {
    return this.leaveForm.get('dateTo') as FormControl;
  }



}
