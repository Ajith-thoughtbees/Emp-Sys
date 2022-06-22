import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { LeaveServiceService } from '../service/leave-service.service';
import { attendance } from './attendance.model';

@Component({
  providers:[LeaveServiceService],
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  leaveForm : FormGroup;
  leave!: attendance[];


  constructor(private formBuilder:FormBuilder,private leaves:LeaveServiceService) { this.leaveForm = formBuilder.group({});
  }

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      employeeName : this.formBuilder.control('',[Validators.required]),
      leaveType: this.formBuilder.control('',[Validators.required,]),
      leaveReason: this.formBuilder.control('',[Validators.required,]),
      dateFrom: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      dateTo: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
    })

  }
  addLeave() {
    let leave: attendance = {
      employeeName: (this.employeeName.value || {}),
      leaveReason: (this.LeaveReason.value||{}),
      leaveType: (this.LeaveType.value || {}),
      dateFrom: (this.DateFrom.value || {}),
      dateTo: (this.DateTo.value || {})
    }
    console.log(this.leaveForm.value)
    this.leaves = Object.assign(this.leaves, this.leaveForm.value)
    localStorage.setItem('leave', JSON.stringify(this.leaveForm.value));

  }
 public get employeeName(): FormControl{
  return this.leaveForm.get('employeeName') as FormControl;
 }

  public get LeaveReason(): FormControl {
    return this.leaveForm.get('leaveReason') as FormControl;
  }
  public get LeaveType(): FormControl {
    return this.leaveForm.get('leaveType') as FormControl;
  }
  public get DateFrom(): FormControl {
    return this.leaveForm.get('dateFrom') as FormControl;
  }
  public get DateTo(): FormControl {
    return this.leaveForm.get('dateTo') as FormControl;
  }


}
