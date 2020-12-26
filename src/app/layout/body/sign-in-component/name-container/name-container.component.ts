import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.css']
})
export class NameContainerComponent implements OnInit {
  fName = "";
  lName = ""
  fNameEntered: boolean;
  @Output() enterfName = new EventEmitter();
  @Output() enterlName = new EventEmitter();

  constructor() {
    this.fNameEntered = false
  }

  ngOnInit(): void {
  }

  onEnterfName(){
    this.enterfName.emit(this.fName)
  }

  onEnterlName(){
    this.enterlName.emit(this.lName)
  }

}
