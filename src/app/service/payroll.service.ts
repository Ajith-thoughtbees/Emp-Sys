import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
 

   baseUrl = "http://localhost:3000/payroll";
  constructor(private http:HttpClient) { }
  postData(data:any){
    return this.http.post<any>(this.baseUrl,data).pipe(map((res:any)=>{
     return res;
  }))

}
  
  getData(){
    return this.http.get<any>(this.baseUrl).pipe(map((res:any)=>{
     return res;
  }))
  
}

updateData(data:any,id:number){
  return this.http.put<any>(this.baseUrl+id,data).pipe(map((res:any)=>{
   return res;
}))
}

deleteData(id:number){
  return this.http.delete<any>(this.baseUrl+id).pipe(map((res:any)=>{
   return res;
}))
}
}
