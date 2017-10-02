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

  hoverElem;
  startColor = "rgba(192, 192, 192, .5)";
  fillColor = "rgba(92, 184, 92, 0.5)";
  reservations: any = [];

  hoveredElem = null;
  selectedReservation: any = {};

  areas: any = [];
  hoveredReservation: number;
  map;
  fromDate:Date;
  toDate:Date;

  constructor(
    private bookingService: BookingService,
    public authService: AuthenticationService) { }

  ngOnInit() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.initNowDates();
   
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

  selectReservation(res) {
    if(this.selectedReservation == res) {
      this.selectedReservation = null;
      this.initNowDates();
    } else {
      this.selectedReservation = res;
      this.fromDate = new Date(res.startDate);
      this.toDate = new Date(res.endDate);
    }
    this.getAreas();
  }

  private getAreas() {
    this.bookingService.getCampsiteAreas(this.fromDate, this.toDate)
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

  private initNowDates() {
    // From date
    this.fromDate = new Date();
    this.fromDate.setHours(12);
    this.fromDate.setMinutes(0);
    this.fromDate.setSeconds(0);

    // To date
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate() + 1);
    this.toDate.setHours(11);
    this.toDate.setMinutes(59);
    this.toDate.setSeconds(0);
  }

}
