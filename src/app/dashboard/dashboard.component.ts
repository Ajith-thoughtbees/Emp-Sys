import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;


  employeeForm: FormGroup;
  submitted = false;
  employees: Employee[];
  employeesToDisplay: Employee[];
  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstname: this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
      lastname: this.fb.control('',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]),
      birthday: this.fb.control('',[Validators.required,Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]),
      gender: this.fb.control('',[Validators.required,]),
      education: this.fb.control('default',[Validators.required]),
      company: this.fb.control('',[Validators.required]),
      jobExperience: this.fb.control('',[Validators.required]),
      salary: this.fb.control('',[Validators.required]),

    });
    this.api.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthday: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.api.postEmployees(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });

  }

  removeEmployee(event: any) {
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.api.deleteEmployees(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

  editEmployee(event: any) {
    this.employees.forEach((val,index) => {
      if (val.id === event) {
        this.api.editEmployees(event,index).subscribe((res)=>{

        });
      }
    });
    this.addEmployeeButton.nativeElement.click();
  };

  setForm(event:any ) {

    this.employeeForm.controls['firstname'].setValue(event.firstname);
    this.employeeForm.controls['lastname'].setValue(event.lastname);
    this.employeeForm.controls['birthday'].setValue(event.birthday);
    this.Gender.setValue(event.gender);
    let educationIndex = 0;
    this.educationOptions.forEach((val, index) => {
      if (val === event.education) educationIndex = index;
    });
    this.employeeForm.controls['education'].setValue(event.education);

    this.employeeForm.controls['company'].setValue(event.company);
    this.employeeForm.controls['jobExperience'].setValue(event.jobExperience);
    this.employeeForm.controls['salary'].setValue(event.salary);
    this.fileInput.nativeElement.value = '';
  }

  searchEmployees(event: any) {
    let filteredEmployees: Employee[] = [];
    if (event === '') {
      this.employeesToDisplay = this.employees;
    } else {
      filteredEmployees = this.employees.filter((val, index) => {
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.employeesToDisplay = filteredEmployees;
    }
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Education.setValue('');
    this.Company.setValue('');
    this.JobExperience.setValue('');
    this.Salary.setValue('');
    this.fileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.employeeForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl;
  }
  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl;
  }
  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl;
  }
  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl;
  }

  
}
