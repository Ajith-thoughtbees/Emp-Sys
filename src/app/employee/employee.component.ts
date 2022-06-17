import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Employee } from '../dashboard/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[Employee]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() onRemoveEmployee = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();
  constructor() {
     this.employee = {
      firstname: '',
      lastname: '',
      birthday: '',
      gender: '',
      education: '',
      company: '',
      jobExperience: 0,
      salary: 0,
      profile: '',
    };
   }

  ngOnInit(): void {
    console.log(this.employee)
  }
  deleteEmployeeClicked() {
    this.onRemoveEmployee.emit(this.employee.id);
  }

  editEmployeeClicked(){
    this.onEditEmployee.emit(this.employee.id);
  }
}
