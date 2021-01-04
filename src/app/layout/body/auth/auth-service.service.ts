import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { string } from 'joi';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { ValidateData } from './validate-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  authURL: String = 'http://localhost:3000/api/user';

  private isAuth: boolean = false;
  private isAdmin: boolean = false;

  private token: string = '';
  private tokenTimer!: any;
  private userEmail: String = '';
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getEmail() {
    return this.userEmail;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  changePassword(oldPassword: String, newPassword: String) {
    const passwordContainer = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    this.http
      .put<{ message: string }>(
        `${this.authURL}/change-password`,
        passwordContainer
      )
      .subscribe(
        (message) => {
          alert(message.message);
        },
        (error) => {
          alert(error);
        }
      );
  }

  createUser(fName: String, lName: String, email: String, password: String) {
    const authData: AuthData = {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      active: true,
    };
    this.http.post(`${this.authURL}/signup`, authData).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.authStatusListener.next(false);
        this.adminStatusListener.next(false)
      }
    );
  }

  login(email: String, password: String) {
    const validateData: ValidateData = {
      email: email,
      password: password,
    };

    this.userEmail = email;

    this.http
      .post<{ token: string; isAdmin: boolean; expiresIn: number }>(
        `${this.authURL}/login`,
        validateData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (response.isAdmin) {
            const isAdmin = response.isAdmin;
            this.isAdmin = isAdmin;
            this.adminStatusListener.next(true)
          }else {
            const isAdmin = response.isAdmin;
            this.isAdmin = isAdmin;
            this.adminStatusListener.next(false)
          }
          
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuth = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            let mail = String(email);
            this.saveAuthData(token, expirationDate, mail);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          this.adminStatusListener.next(false);
        }
      );

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    if (!authInformation?.expirationDate) return;
    const expiresIn = authInformation?.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = '';
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.isAdmin = false;
    this.adminStatusListener.next(false)
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email', email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const email = localStorage.getItem('email');
    if (!token || !expirationDate) return;
    return {
      token: token,
      email: email,
      expirationDate: new Date(expirationDate),
    };
  }
}
