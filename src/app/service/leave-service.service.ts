import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'
import { attendance } from '../attendance/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {



  constructor(private http:HttpClient) { }

  postAttendance(absent : attendance){
    return this.http.post<attendance>('http://192.168.200.33:3000/attendance', absent)
  }

  getAttendance(){
    return this.http.get<attendance[]>('http://192.168.200.33:3000/attendance', )
  }

  updateAttendance(data:any,id:number){
    return this.http.put<any>('http://192.168.200.33:3000/attendance/'+id,data)
  }

  deleteAttendance(id: string){
    return this.http.delete('http://192.168.200.33:3000/attendance/' +id)
  }
}
