import { Component, OnInit } from '@angular/core';
import { BookingService } from './../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
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
