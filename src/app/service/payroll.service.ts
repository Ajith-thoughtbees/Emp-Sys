import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PayrollService {


  constructor(private http:HttpClient) { }
  postData(data:any){
    return this.http.post<any>("http://192.168.200.33:3000/payroll",data).pipe(map((res:any)=>{
     return res;
  }))

}

  getData(){
    return this.http.get<any>("http://192.168.200.33:3000/payroll").pipe(map((res:any)=>{
     return res;
  }))

}

updateData(data:any,id:number){
  return this.http.put<any>("http://192.168.200.33:3000/payroll/"+id,data).pipe(map((res:any)=>{
   return res;
}))
}

deleteData(id:number){
  return this.http.delete<any>("http://192.168.200.33:3000/payroll/"+id).pipe(map((res:any)=>{
   return res;
}))
}
}
