import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './layout/body/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'lab5';

  constructor(private authService: AuthServiceService){}

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
