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
  leaveForm !: FormGroup;
  absent :any =[];
  days:any =[];
  comment : string = "";
  empId : any;


  constructor(private formBuilder:FormBuilder,private leaveService:LeaveServiceService) {
      this.absent =[];

}

  ngOnInit(): void {
     this.leaveForm = this.formBuilder.group({

      comment: this.formBuilder.control('',[Validators.required,]),

     }),

    this.leaveService.getAttendance().subscribe((res) => {
     this.absent = res
    
    });

  }
  emp(){
    this.leaveService.getAttendance().subscribe((res) => {
      let search = (obj: { id:any }) => obj.id === this.empId

      let check =this.absent.findIndex(search);

      console.log(check);
      this.days =res[check]
      console.log(this.days);
  })}

  acceptedLeave(arr:any) {

 arr.status = 1;
 this.leaveService.updateAttendance(arr,arr.id).subscribe((res)=>{
 console.log(res);

 })
  }
  deniedLeave(arr:any){
alert('Leave denied')
arr.status = 2;
this.leaveService.updateAttendance(arr,arr.id).subscribe((res)=>{
  console.log(res);

  })

  }
  cancelledLeave(arr:any){
alert('Leave cancelled')
arr.status = 3;
this.leaveService.updateAttendance(arr,arr.id).subscribe((res)=>{
  console.log(res);

  })
  }



leave(id:any){
 this.empId =id
 console.log(this.empId);

}




}
