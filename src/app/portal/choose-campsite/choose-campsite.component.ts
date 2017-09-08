import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, animate, state, style, transition } from '@angular/animations';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-choose-campsite',
  templateUrl: './choose-campsite.component.html',
  styleUrls: ['./choose-campsite.component.css'],
  animations: [
    trigger('campsiteHover', [
      state('0', style({ backgroundColor: 'rgba(92, 184, 92, .5)' })),
      state('1', style({ backgroundColor: 'rgba(92, 184, 92, .8)' })),
      transition('0 => 1', animate('200ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ])
  ]
})
export class ChooseCampsiteComponent implements OnInit {

  campsites: any = [];
  hoveredCampsite: number;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.campsites = this.authService.currentUser.campsites;
  }

  setHoveredCampsite(index) {
    this.hoveredCampsite = index;
  }

  removeHoveredCampsite() {
    this.hoveredCampsite = null;
  }

  selectCampsite(index) {
    let data = {"campsite": this.campsites[index]};
    this.authService.setCampsite(data);
    this.router.navigate(['/portal']);
  }

}
