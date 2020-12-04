import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  // SignIn Function for website
  signIn(username:HTMLInputElement, password:HTMLInputElement){
    this.username = username.value;
    this.password = password.value;
    alert(this.username + this.password)
  }

}
