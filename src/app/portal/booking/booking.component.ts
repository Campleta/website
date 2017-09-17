import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BookingService } from './../../services/booking.service';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  animations: [
    trigger('reservationsHover', [
      state('0', style({ backgroundColor: 'transparent' })),
      state('1', style({ backgroundColor: '#5cb85c' })),
      transition('0 => 1', animate('200ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ]),
    trigger('areaHover', [
      state('0', style({ opacity: '0.2' })),
      state('1', style({ opacity: '1' })),
      transition('0 => 1', animate('200ms ease-in')),
      transition('1 => 0', animate('200ms ease-out'))
    ])
  ]
})
export class BookingComponent implements OnInit {

  occupiedColor = "rgba(251, 24, 24, .5)";
  partlyOccupied = "rgba(251, 221, 24, .5)";

  lastClicked;
  hoverElem;
  startColor = "rgba(192, 192, 192, .5)";
  fillColor = "rgba(92, 184, 92, 0.5)";
  selectColor = "blue";
  startStroke = "6.11153841";
  hoverStroke = "8";
  reservations: any = [];

  hoveredElem = null;

  areas: any = [];

  spot: any = {};
  hoveredReservation: number;
  map;

  constructor(
    private bookingService: BookingService,
    public authService: AuthenticationService) { }

  ngOnInit() {
    this.lastClicked
    this.getReservations();
  }

  setHoverElem(elem) {
    this.hoveredElem = elem.srcElement;
    this.hoveredElem.style.fill = this.fillColor;
  }

  removeHoverElem(elem) {
    let area = this.areas.find(x => x.Name === elem.srcElement.id);
    if(area) {
      this.hoveredElem.style.fill = area.color;
      this.hoveredElem = null;
    }
  }

  setHoveredReservation(index) {
    this.hoveredReservation = index;
  }

  removeHoveredReservation() {
    this.hoveredReservation = null;
  }

  setMapData(event) {
    this.map = event;
    this.getAreas();
  }

  updateMapData() {
    this.areas.forEach(element => {
      var elem = this.map.querySelector("#" + element.Name);
      if (!element.Available) {
        elem.style.fill = this.occupiedColor;
        element.color = this.occupiedColor;
      } else {
        elem.style.fill = this.startColor;
        element.color = this.startColor;
      }
    });
  }

  private getAreas() {
    let fromDate = new Date();
    fromDate.setHours(12);
    fromDate.setMinutes(0);
    fromDate.setMilliseconds(0);
    let toDate = new Date();
    toDate.setHours(11);
    toDate.setMinutes(59);
    toDate.setMilliseconds(0);
    this.bookingService.getCampsiteAreas(fromDate, toDate)
      .subscribe(res => {
        this.areas = res;
        this.updateMapData();
      });
  }

  private getReservations() {
    this.bookingService.getNotPlacedReservations()
      .subscribe(data => {
        this.reservations = data;
      });
  }

}
