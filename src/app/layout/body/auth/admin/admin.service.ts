import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './users/users.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminURL: String = "http://localhost:3000/api/admin"
  user: User[] = []

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers(){
    return this.http.get<User[]>(`${this.adminURL}/users`)
  }

  // Activate user
  activateUser(userID: String){
    return this.http.put<User[]>(`${this.adminURL}/users/activate/${userID}`, {})
  }

  // Deactivate user
  deactivateUser(userID: String){
    return this.http.put<User[]>(`${this.adminURL}/users/deactivate/${userID}`, {})
  }

  // Give Admin Priviledges
  giveUserAdmin(userID:String){
    return this.http.put<User[]>(`${this.adminURL}/users/admin/${userID}`, {})
  }

}
