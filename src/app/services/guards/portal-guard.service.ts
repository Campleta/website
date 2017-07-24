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
    for (var index = 0; index < currentUser.roles.length; index++) {
      var element = currentUser.roles[index];

      if(element.name === "Employee") return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }

}
