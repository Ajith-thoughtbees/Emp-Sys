import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'
import { attendance } from '../attendance/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {
  unshift(att: attendance) {
    throw new Error('Method not implemented.');
  }

   baseUrl= 'http://localhost:3000/attendance';
  constructor(private http:HttpClient) { }

  postAttendance(employee : attendance){
    return this.http.post<attendance>(this.baseUrl, employee)
  }

  getAttendance(){
    return this.http.get<attendance[]>(this.baseUrl)
  }

  updateAttendance(data:any,id:number){
    return this.http.put<any>(this.baseUrl +id,data)
  }
  deleteAttendance(id: string){
    return this.http.delete(this.baseUrl + '/' +id)
  }
}
