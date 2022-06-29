import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Employee } from '../dashboard/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  selectedT: any;
  baseUrl = 'http://localhost:3000/posts';

  constructor(private http:HttpClient) {

   }
postEmployees(employee : Employee){
  return this.http.post<Employee>(this.baseUrl, employee)
}

getEmployees(){
  console.log('in api')
  return this.http.get<Employee[]>(this.baseUrl)
}

editEmployees(data:any,id:number){
  return this.http.put<any>(this.baseUrl +id,data)
}

deleteEmployees(id: string){
  return this.http.delete(this.baseUrl + '/' +id)
}


}

