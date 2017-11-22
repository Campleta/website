import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from './../../services/booking.service';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit, OnDestroy {

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
  };
  id: Number;
  reservation: any = {};
  private sub: any;
  amountPersons: Number;
  persons: Array<Guest> = [
  ];
  startDate: any = { date: { day: 0, month: 0, year: 0 }};
  endDate: any = { date: { day: 0, month: 0, year: 0 }};
  stays: any = [];

  editReservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private bookingService: BookingService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editReservationForm = this.formBuilder.group({
        reservationStartDate: [null],
        reservationEndDate: [null],
        staysArray: this.formBuilder.array([])
      });
      this.loadReservation(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initStay() {
    return this.formBuilder.group({
      startDate: [null],
      endDate: [null],
      guestArray: this.formBuilder.array([
        this.initGuest(),
      ])
    });
  }

  initStayWithData(data:any) {
    let guestFormArr = [];
    data.guests.forEach(element => {
      guestFormArr.push(this.initGuestWithData(element));
    });

    let tmpStartDate = new Date(data.startDate);
    let tmpEndDate = new Date(data.endDate);

    return this.formBuilder.group({
      startDate: [{date: {
        year: tmpStartDate.getFullYear(),
        month: tmpStartDate.getMonth()+1,
        day: tmpStartDate.getDate()
      }}],
      endDate: [{date: {
        year: tmpEndDate.getFullYear(),
        month: tmpEndDate.getMonth()+1,
        day: tmpEndDate.getDate()
      }}],
      guestArray: this.formBuilder.array(
        guestFormArr
      )
    })
  }

  initGuest() {
    return this.formBuilder.group({
      anonymous: [''],
      passport: [''],
      firstname: [''],
      lastname: ['']
    });
  }

  initGuestWithData(data:any) {
    return this.formBuilder.group({
      anonymous: [''],
      passport: [data.passport],
      firstname: [data.firstname],
      lastname: [data.lastname]
    });
  }

  addStay() {
    const control = <FormArray>this.editReservationForm.controls['staysArray'];
    control.push(this.initStay());
  }

  addStayWithData(data:any) {
    const control = <FormArray>this.editReservationForm.controls['staysArray'];
    control.push(this.initStayWithData(data));
  }

  public addGuest(stay) {
    const control = <FormArray>stay.controls['guestArray'];
    control.push(this.initGuest());
  }

  public removeGuest(stay, guestIndex) {
    const control = <FormArray>stay.controls['guestArray'];
    control.removeAt(guestIndex);
  }

  public removeStay(stayIndex: number) {
    const control = <FormArray>this.editReservationForm.controls['staysArray'];
    control.removeAt(stayIndex);
  }

  public saveReservation() {

  }

  private loadReservation(id: Number) {
    this.bookingService.getReservation(id).subscribe(response => {

      // Set Reservation dates.
      let resStart = new Date(response.startDate);
      let resEnd = new Date(response.endDate);
      this.editReservationForm.patchValue({
        reservationStartDate: {
          date: {
            year: resStart.getFullYear(),
            month: resStart.getMonth() + 1,
            day: resStart.getDate()
          }
        },
        reservationEndDate: {
          date: {
            year: resEnd.getFullYear(),
            month: resEnd.getMonth() + 1,
            day: resEnd.getDate()
          }
        }
      });

      // Add stays with guests.
      response.stays.forEach(element => {
        this.addStayWithData(element);
      });
    });
  }

}
export class Guest {
  id: number;
  passport: string;
  firstname: string;
  lastname: string;
  anonymous: boolean;
}