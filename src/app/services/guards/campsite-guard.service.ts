import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';

@Injectable()
export class CampsiteGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    // Check if campsite is set
    if (this.authService.campsite == null) {
      // If not set, check if user is set
      if (this.authService.currentUser != null) {
        console.log("hihi", this.authService.currentUser.campsites);
        // Check amount campsites attached to user
        if (this.authService.currentUser.campsites.length > 1) {
          console.log("test");
          this.router.navigate(['/portal/campsite']);
          return false;
        } else {
          this.authService.setCampsite(this.authService.currentUser);
        }
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
