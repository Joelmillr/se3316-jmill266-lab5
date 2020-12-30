import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-container',
  templateUrl: './email-container.component.html',
  styleUrls: ['./email-container.component.css']
})
export class EmailContainerComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  @Output() enterEmail = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEnterEmail(){
    // does not emit an event if the email input is blank or not a valid email
    if(this.email.hasError('email') || this.email.hasError('required')){

    }
    else this.enterEmail.emit(this.email.value)
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
