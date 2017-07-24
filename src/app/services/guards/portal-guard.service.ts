import { Injectable } from '@angular/core';
import { 
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './../authentication.service';

@Injectable()
export class PortalGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkPortalAuthorization(url);
  }

  checkPortalAuthorization(url: string): boolean {
    let currentUser = this.authService.currentUser;
    if(currentUser.roles) {
      currentUser.roles.forEach(element => {
        if(element === "Portal") {
          return true;
        }
      });
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }

}
