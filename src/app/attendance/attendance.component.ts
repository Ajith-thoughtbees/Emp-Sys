import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { empty } from 'rxjs';
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
   Accepted!:Boolean;
   Declined!:Boolean;
  leaveForm : FormGroup;
  absent: attendance[];
  absenteesToDisplay: attendance[];


  constructor(private formBuilder:FormBuilder,private leaveService:LeaveServiceService) {
     this.leaveForm = formBuilder.group({});
      this.absent =[];
    this.absenteesToDisplay = this.absent;
}

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      leaveType: this.formBuilder.control('',[Validators.required,]),
      leaveReason: this.formBuilder.control('',[Validators.required,]),
      dateFrom: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      dateTo: this.formBuilder.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      comment: this.formBuilder.control('')
    })
    this.leaveService.getAttendance().subscribe((res) => {
      for (let emp of res) {
        this.absent.push(emp);
      }

    });
  }
  addLeave() {
    let leave: attendance = {
      leaveReason: (this.LeaveReason.value||{}),
      leaveType: (this.LeaveType.value || {}),
      dateFrom: (this.DateFrom.value || {}),
      dateTo: (this.DateTo.value || {}),
      comment: ("")

    }
    this.leaveService.postAttendance(leave).subscribe((res) => {
      this.absent.unshift(res);

    });

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
