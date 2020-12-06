import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-container',
  templateUrl: './password-container.component.html',
  styleUrls: ['./password-container.component.css']
})
export class PasswordContainerComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

}
