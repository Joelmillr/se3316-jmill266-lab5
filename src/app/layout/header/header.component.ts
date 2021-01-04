import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../body/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs!: Subscription
  private adminListenerSubs!: Subscription
  isAuth = false
  isAdmin = false

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth()
    this.isAdmin = this.authService.getIsAdmin()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated
    });
    this.adminListenerSubs = this.authService.getAdminStatusListener().subscribe(isAdmin => {
      this.isAdmin = isAdmin
    })
  }

  onLogout(){
    this.authService.logout();
  }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }

}
