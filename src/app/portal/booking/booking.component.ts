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
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalComponent } from './../../directives/modal/modal.component';
import { AreaModalComponent } from './../../directives/area-modal/area-modal.component';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: [
    './booking.component.css'
  ],
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

  bsModalRef: BsModalRef;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
  };
  fromDate: any; //= { date: { day: 0, month: 0, year: 0 }};
  toDate: any; //= { date: { day: 0, month: 0, year: 0 }};

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

  constructor(
    private bookingService: BookingService,
    private modalService: BsModalService,
    public authService: AuthenticationService) {


  }

  ngOnInit() {
    this.getReservations();
  }

  onReservationDrag(res: any) {
    let startDate = new Date(res.startDate);
    let endDate = new Date(res.endDate);
    this.selectedReservation = res;
    this.fromDate = {
      date: {
        day: startDate.getDate(),
        month: startDate.getMonth() + 1,
        year: startDate.getFullYear()
      }
    }
    this.toDate = {
      date: {
        day: endDate.getDate(),
        month: endDate.getMonth() + 1,
        year: endDate.getFullYear()
      }
    }
    this.getAreas();
  }

  onReservationDragEnd(res: any) {
    this.initNowDates();
    this.getAreas();
  }

  onReservationDrop(res: any) {
    let tmpArea = this.areas.find(x => x.Name == res.nativeEvent.target.id);

    if (tmpArea.Available) {
      this.bsModalRef = this.modalService.show(ModalComponent);
      this.bsModalRef.content.title = "Place reservation";
      this.bsModalRef.content.text = "Are you sure you want to place the reservation on " + tmpArea.Name + "?";
      this.bsModalRef.content.modalResponse.subscribe(result => {
        if (result) {
          this.bookingService.addAreaToReservation(res.dragData.id, tmpArea.Id)
            .subscribe(result => {
              this.getAreas();
              this.getReservations();
            });
        }
      });
    }
  }

  onDateChanged(event: IMyDateModel, model) {
    if (model == "fromDate") {
      this.fromDate = {
        date: {
          day: event.date.day,
          month: event.date.month,
          year: event.date.year
        }
      }
    } else if (model == "toDate") {
      this.toDate = {
        date: {
          day: event.date.day,
          month: event.date.month,
          year: event.date.year
        }
      }
    }

    this.getAreas();
  }

  setHoverElem(elem) {
    this.hoveredElem = elem.srcElement;
    this.hoveredElem.style.fill = this.fillColor;
  }

  removeHoverElem(elem) {
    let area = this.areas.find(x => x.Name === elem.srcElement.id);
    if (area) {
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
    this.initNowDates();
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

  displayAreaInfo(area) {
    let tmpArea = this.areas.find(x => x.Name == area.srcElement.id);

    this.bsModalRef = this.modalService.show(AreaModalComponent);
    this.bsModalRef.content.title = tmpArea.Name;
    this.bsModalRef.content.area = tmpArea;
    this.bsModalRef.content.modalResponse.subscribe(result => {
    });
    this.bookingService.getNowReservationForArea(tmpArea.Id).subscribe(result => {
      this.bsModalRef.content.reservations = result;
    });
  }

  selectReservation(res) {
    if (this.selectedReservation == res) {
      this.selectedReservation = null;
      this.initNowDates();
    } else {
      this.selectedReservation = res;
      let startDate = new Date(res.startDate);
      let endDate = new Date(res.endDate);
      this.fromDate = {
        date: {
          day: startDate.getDate(),
          month: startDate.getMonth() + 1, // // Month attribute is 0-index
          year: startDate.getFullYear()
        }
      }
      this.toDate = {
        date: {
          day: endDate.getDate(),
          month: endDate.getMonth() + 1, // // Month attribute is 0-index
          year: endDate.getFullYear()
        }
      }
    }
    this.getAreas();
  }

  private getAreas() {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setDate(this.fromDate.date.day);
    startDate.setMonth(this.fromDate.date.month);
    startDate.setFullYear(this.fromDate.date.year);
    startDate.setHours(12);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    endDate.setDate(this.toDate.date.day);
    endDate.setMonth(this.toDate.date.month);
    endDate.setFullYear(this.toDate.date.year);
    endDate.setHours(11);
    endDate.setMinutes(59);
    endDate.setSeconds(0);

    this.bookingService.getCampsiteAreas(startDate, endDate)
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
    let date = new Date();
    this.fromDate = {
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1, // // Month attribute is 0-index
        year: date.getFullYear()
      }
    }
    this.toDate = {
      date: {
        day: date.getDate() + 1,
        month: date.getMonth() + 1, // Month attribute is 0-index
        year: date.getFullYear()
      }
    }
  }

}