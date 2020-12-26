import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent implements OnInit {
  signedIn: boolean;
  @Output() signIn = new EventEmitter();
  @Output() signUp = new EventEmitter();
  email = ""
  password = ""
  fName = ""
  lName = ""

  constructor(){
    this.signedIn = false;
  }
  ngOnInit(): void {
  }

  onSignIn(){
    if(this.email == "" || this.password == "") alert("Please enter a valid email and password!")
    else{
      const verifyAccount = {
        "email": this.email,
        "password": this.password
      }
      // Sign user in
    }
  }

  onSignUp() {
    if(this.email == "" || this.password == "" || this.fName == "" || this.lName == "") alert("Please enter all input fields respectively!")
    else{
      const newAccount = {
        "fName": this.fName,
        "lName": this.lName,
        "email": this.email,
        "password": this.password
      }
      // Sign user up
    }
  }

  updateEmail(email:string){
    this.email = email;
  }

  updatePassword(password:string){
    this.password = password;
  }

  updatefName(fName:string){
    this.fName = fName;
  }

  updatelName(lName:string){
    this.lName = lName;
  }

}
