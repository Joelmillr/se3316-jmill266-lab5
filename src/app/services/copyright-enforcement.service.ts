import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CopyrightEnforcement } from '../layout/copyrightEnforcement/copyrightEnforcement.model';

@Injectable({
  providedIn: 'root'
})
export class CopyrightEnforcementService {
  copywriteURL:string = 'http://localhost:3000/api/copyright-enforcement';
  copyrightEnforcements: CopyrightEnforcement[] = []

  constructor(private http: HttpClient) { }

  getCopyrightEnforcements() {
    return this.http.get<CopyrightEnforcement[]>(`${this.copywriteURL}`)
  }

  createCopyrightEnforcement(title: String, description: String){
    return this.http.post<CopyrightEnforcement>(`${this.copywriteURL}/new-document`, {"title": title, "description": description})
  }

  updateCopyrightEnforcement(newDescription: String, documentID: String){
    return this.http.put<{message:String}>(`${this.copywriteURL}/update/${documentID}`, {"newDescription": newDescription})
  }

}
