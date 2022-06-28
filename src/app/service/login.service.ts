import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,} from '@angular/common/http'
import { User } from '../login/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //  baseUrl= 'http://localhost:3000/login';
  constructor(private http:HttpClient) { }

  login(user : User) : Observable<any> {
    return this.http.post<any>('http://localhost:3000/login',user);
  }


}
