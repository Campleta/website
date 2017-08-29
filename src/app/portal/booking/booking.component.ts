import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { BookingService } from './../../services/booking.service';
 
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
    ])
  ]
})
export class BookingComponent implements OnInit {

  lastClicked;
  hoverElem;
  startColor = "c0c0c0";
  fillColor = "d9edf7";
  selectColor = "blue";
  startStroke = "6.11153841";
  hoverStroke = "8";
  reservations: any = [];
  
  spot: any = {};
  hoveredReservation: number;

  constructor(private bookingService: BookingService) { }

  

  ngOnInit() {
    this.lastClicked
    this.getReservations();
  }

  selectElem(elem) {
    if(this.lastClicked != null) {
      this.lastClicked.srcElement.style.fill = this.startColor;
    }

    if(this.lastClicked != null && this.lastClicked.srcElement === elem.srcElement) {
      this.lastClicked.srcElement.style.fill = this.startColor;
      this.lastClicked = null;
    } else {
      elem.srcElement.style.fill = this.fillColor;
      this.lastClicked = elem;
    }

    this.getItemInfo(this.lastClicked);
  }

  setHoveredReservation(index) {
    this.hoveredReservation = index;
  }

  removeHoveredReservation() {
    this.hoveredReservation = null;
  }

  getItemInfo(elem) {
    this.spot.name = "test";
    this.spot.id = elem.srcElement.id;
  }

  private getReservations() {
    this.bookingService.getNotPlacedReservations()
      .subscribe(data => {
        this.reservations = data;
      });
  }

}
