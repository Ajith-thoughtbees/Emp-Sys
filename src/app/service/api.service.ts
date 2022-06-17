import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs';
import { Employee } from '../dashboard/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/posts';

  constructor(private http:HttpClient) {

   }
postEmployees(employee : Employee){
  return this.http.post<Employee>(this.baseUrl, employee)
}

getEmployees(){
  return this.http.get<Employee[]>(this.baseUrl)
}
deleteEmployees(id: string){
  return this.http.delete(this.baseUrl + '/' +id)
}

}
