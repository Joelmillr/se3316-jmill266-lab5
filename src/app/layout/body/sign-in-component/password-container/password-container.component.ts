import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-password-container',
  templateUrl: './password-container.component.html',
  styleUrls: ['./password-container.component.css']
})
export class PasswordContainerComponent implements OnInit {
  hide = true;
  password = ""
  @Output() enterPassword = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEnterPassword(){
    this.enterPassword.emit(this.password)
  }
}
