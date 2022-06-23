import { Component, OnInit } from '@angular/core';
import { LeaveServiceService } from '../service/leave-service.service';
import { FormBuilder, FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { attendance } from '../attendance/attendance.model';
@Component({
  selector: 'app-leave',
  providers:[LeaveServiceService],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
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
    })
    this.leaveService.getAttendance().subscribe((res) => {
      for (let emp of res) {
        this.absent.unshift(emp);
      }
      this.absenteesToDisplay = this.absent;
    });
  }
  addLeave() {
    let leave: attendance = {
      leaveReason: (this.LeaveReason.value||{}),
      leaveType: (this.LeaveType.value || {}),
      dateFrom: (this.DateFrom.value || {}),
      dateTo: (this.DateTo.value || {})
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
