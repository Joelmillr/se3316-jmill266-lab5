import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class AuthAminGuard implements CanActivate{
  constructor(private authService:AuthServiceService , private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isAdmin = this.authService.getIsAdmin();
      if(!isAdmin){
        this.router.navigate(['/sign-in-sign-up'])
      }
      return isAdmin;
  }

}
