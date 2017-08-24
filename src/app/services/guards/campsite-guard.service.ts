import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';

@Injectable()
export class CampsiteGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    if(this.authService.campsite == null) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

}
