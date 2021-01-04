import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { ValidateData } from './validate-data.model'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  authURL: String = "http://localhost:3000/api/user"

  private isAuth:boolean = false;

  private token:string = "";
  private userEmail: String = "";
  private authStatusListener = new Subject<boolean>();

  constructor(private http:HttpClient, private router: Router){ }

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuth
  }

  getEmail() {
    return this.userEmail
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(fName:String, lName:String, email: String, password: String){

    const authData: AuthData = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      active: true,
    }
    this.http.post(`${this.authURL}/signup`, authData).subscribe(response => {
      console.log(response)
    })
  }

  login(email:String, password:String){
    const validateData: ValidateData = {
      email: email,
      password: password,
    }
    this.userEmail = email
    this.http.post<{token: string}>(`${this.authURL}/login`, validateData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        this.isAuth = true
        this.authStatusListener.next(true);
        this.router.navigate(['/'])
      }
    })
  }

  logout() {
    this.token = "";
    this.isAuth = false
    this.authStatusListener.next(false)
    this.router.navigate(['/'])
  }
}

