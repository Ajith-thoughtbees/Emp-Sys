import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //  baseUrl= 'http://localhost:3000/login';
  constructor(private http:HttpClient) { }

  postData(data:any) {
    return this.http.post("http://localhost:3000/login",data);
  }
  getData(){
    {
      return this.http.get('http://localhost:3000/login', )
    }
  }

}
