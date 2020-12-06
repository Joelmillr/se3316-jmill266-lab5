import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-container',
  templateUrl: './email-container.component.html',
  styleUrls: ['./email-container.component.css']
})
export class EmailContainerComponent implements OnInit {
  email = new FormControl('', [Validators.required,
    Validators.email]);

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
