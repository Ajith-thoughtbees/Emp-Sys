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
  // baseUrl = 'http://localhost:3000/posts';

  constructor(private http:HttpClient) {

   }
postEmployees(employee : Employee){
  return this.http.post<Employee>('http://192.168.200.33:3000/posts', employee)
}

getEmployees(){

  return this.http.get<Employee[]>('http://192.168.200.33:3000/posts')
}

editEmployees(data:any,id:number){
  return this.http.put<any>('http://192.168.200.33:3000/posts/' +id,data)
}

deleteEmployees(id: string){
  return this.http.delete('http://192.168.200.33:3000/posts' + '/' +id)
}


}

