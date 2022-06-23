import { Injectable } from '@angular/core';

import {HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoginService {


   baseUrl= 'http://localhost:3000/register';
  constructor(private http:HttpClient) { }

  login(data:any) {
    return this.http.post(this.baseUrl,data);
  }

}
