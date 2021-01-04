import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  oldPassword = ""
  newPassword = ""

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  changePassword(){
    if(this.oldPassword == "" || this.oldPassword == undefined || this.newPassword == "" || this.newPassword == undefined){
      return;
    } else{
      this.authService.changePassword(this.oldPassword, this.newPassword)
    }
  }
}
