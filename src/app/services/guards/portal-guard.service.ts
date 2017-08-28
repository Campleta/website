import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../authentication.service';
import { AuthHttpService } from './../auth-http.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class PortalGuard implements CanActivate, CanActivateChild {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authService: AuthenticationService, private httpAuth: AuthHttpService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    let url: string = state.url;

    return this.checkPortalAuthorization(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  checkPortalAuthorization(url: any): Promise<boolean> | boolean {
    if(localStorage.getItem("campleta") == null) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    var roles = this.jwtHelper.decodeToken(localStorage.getItem("campleta")).roles;
    if(roles.find(role => role === "Employee")) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

}
