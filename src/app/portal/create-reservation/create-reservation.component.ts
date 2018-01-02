import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { BookingService } from './../../services/booking.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SpinnerService } from './../../services/spinner.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  reservationStartDate: any = { date: { year: 1900, month: 1, day: 1 }};
  reservationEndDate: any = { date: { year: 1900, month: 12, day: 31 }};
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
  };
  subDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
    minYear: 1900,
    maxYear: 2600,
    disableUntil: {
      year: this.reservationStartDate.date.year,
      month: this.reservationStartDate.date.month,
      day: this.reservationStartDate.date.day
    },
    disableSince: {
      year: this.reservationEndDate.date.year,
      month: this.reservationEndDate.date.month,
      day: this.reservationEndDate.date.day
    }
  }
  id: Number;
  private sub: any;
  availableSpots: Number = 0;

  public createReservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let date = new Date();
      this.id = +params['id'];
      this.reservationStartDate = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()}};
      this.reservationEndDate = { date: { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()+1}};
      this.createReservationForm = this.formBuilder.group({
        reservationStartDate: [{
          date: {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
          }
        }],
        reservationEndDate: [{
          date: {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()+1
          }
        }],
        staysArray: this.formBuilder.array([])
      });

      const control = <FormArray>this.createReservationForm.controls['staysArray'];
      control.push(this.initStay());
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public initStay() {
    let tmpStartDate = new Date();
    let tmpEndDate = new Date();
    tmpStartDate.setFullYear(this.createReservationForm.get("reservationStartDate").value.date.year);
    tmpStartDate.setMonth(this.createReservationForm.get("reservationStartDate").value.date.month - 1);
    tmpStartDate.setDate(this.createReservationForm.get("reservationStartDate").value.date.day);
    tmpStartDate.setHours(12);
    tmpStartDate.setMinutes(0);
    tmpStartDate.setSeconds(0);
    tmpEndDate.setFullYear(this.createReservationForm.get("reservationEndDate").value.date.year);
    tmpEndDate.setMonth(this.createReservationForm.get("reservationEndDate").value.date.month - 1);
    tmpEndDate.setDate(this.createReservationForm.get("reservationEndDate").value.date.day);
    tmpEndDate.setHours(11);
    tmpEndDate.setMinutes(59);
    tmpEndDate.setSeconds(0);

    return this.formBuilder.group({
      startDate: [
        {
          date: {
            year: tmpStartDate.getFullYear(),
            month: tmpStartDate.getMonth() + 1,
            day: tmpStartDate.getDate()
          }
        }, Validators.required
      ],
      endDate: [
        {
          date: {
            year: tmpEndDate.getFullYear(),
            month: tmpEndDate.getMonth() + 1,
            day: tmpEndDate.getDate()
          }
        }, Validators.required
      ],
      guestArray: this.formBuilder.array([
        this.initGuest(),
      ])
    });
  }

  public initGuest() {
    return this.formBuilder.group({
      anonymous: [false],
      passport: [{ value: null, disabled: false }, Validators.required],
      firstname: [{ value: null, disabled: false }, Validators.required],
      lastname: [{ value: null, disabled: false }, Validators.required]
    });
  }

  public anonymousChange(guest, value, index: number) {
    const tmpAnonymous: FormControl = guest.controls['anonymous'];
    const tmpPassport: FormControl = guest.controls['passport'];
    const tmpFirstname: FormControl = guest.controls['firstname'];
    const tmpLastname: FormControl = guest.controls['lastname'];

    if (value.target.checked) {
      tmpAnonymous.setValue(true);
      tmpPassport.disable();
      tmpFirstname.disable();
      tmpLastname.disable();
    } else {
      tmpAnonymous.setValue(false);
      tmpPassport.enable();
      tmpFirstname.enable();
      tmpLastname.enable();
    }
  }

  public addStay() {
    const control = <FormArray>this.createReservationForm.controls['staysArray'];
    control.push(this.initStay());
  }

  public removeStay(stayIndex: number) {
    const control = <FormArray>this.createReservationForm.controls['staysArray'];
    control.removeAt(stayIndex);
  }

  public saveReservation() {
    this.spinnerService.show("edit-reservation-spinner");
    let model = this.prepareRequestReservation();
    console.log("Done", model);

    this.bookingService.createReservation(model)
      .subscribe(data => {
        console.log(data);
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.success("Success");
        //this.router.navigate(["/portal/booking"]);
      }, error => {
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.error("Something went wrong, creating the reservation.");
      });

    /*this.bookingService.editReservation(model, this.id)
    .subscribe(response => {
      this.spinnerService.hide("edit-reservation-spinner");
      this.alertService.success("Reservation has been updated.");
      console.log(response);
    }, error => {
      this.spinnerService.hide("edit-reservation-spinner");
      this.alertService.error("Something went wrong.");
    });*/
  }

  private prepareRequestReservation() {
    let model: any = {};
    model.id = this.id;
    model.campsite = this.authService.campsite.id;
    //model.areaType = 0;
    let start = new Date();
    start.setFullYear(this.createReservationForm.get("reservationStartDate").value.date.year);
    start.setMonth(this.createReservationForm.get("reservationStartDate").value.date.month - 1);
    start.setDate(this.createReservationForm.get("reservationStartDate").value.date.day);
    start.setHours(12);
    start.setMinutes(0);
    start.setSeconds(0);
    let end = new Date();
    end.setFullYear(this.createReservationForm.get("reservationEndDate").value.date.year);
    end.setMonth(this.createReservationForm.get("reservationEndDate").value.date.month - 1);
    end.setDate(this.createReservationForm.get("reservationEndDate").value.date.day);
    end.setHours(11);
    end.setMinutes(59);
    end.setSeconds(0);
    model.startDate = start.toISOString();
    model.endDate = end.toISOString();
    model.stays = [];
    this.createReservationForm.get("staysArray").value.forEach(element => {
      let tmpStartDate = new Date();
      let tmpEndDate = new Date();
      tmpStartDate.setFullYear(element.startDate.date.year);
      tmpStartDate.setMonth(element.startDate.date.month - 1);
      tmpStartDate.setDate(element.startDate.date.day);
      tmpStartDate.setHours(12);
      tmpStartDate.setMinutes(0);
      tmpStartDate.setSeconds(0);

      tmpEndDate.setFullYear(element.endDate.date.year);
      tmpEndDate.setMonth(element.endDate.date.month - 1);
      tmpEndDate.setDate(element.endDate.date.day);
      tmpEndDate.setHours(11);
      tmpEndDate.setMinutes(59);
      tmpEndDate.setSeconds(0);

      model.stays.push({
        "guests": element.guestArray.filter(guest => this.validateGuests(guest)),
        "startDate": tmpStartDate.toISOString(),
        "endDate": tmpEndDate.toISOString()
      });
    });

    return model;
  }

  private validateGuests(guest: Guest) {
    if (guest.anonymous) {
      return guest;
    } else {
      if (guest.passport) {
        return guest;
      }
    }
  }

  public onStartDateChanged(event: IMyDateModel) {
    this.reservationStartDate = { date: { year: event.date.year, month: event.date.month, day: event.date.day } };
    let tmp: any = { date: { year: event.date.year, month: event.date.month - 1, day: event.date.day }};
    this.disableUntil(tmp.date);
  }

  public onEndDateChanged(event: IMyDateModel) {
    this.reservationEndDate = { date: { year: event.date.year, month: event.date.month, day: event.date.day }};
    let tmp: any = { date: { year: event.date.year, month: event.date.month - 1, day: event.date.day }};
    this.disableSince(tmp.date);
  }

  private disableUntil(startDate: any) {
    let d: Date = new Date();
    d.setFullYear(startDate.year);
    d.setMonth(startDate.month);
    d.setDate(startDate.day - 1);
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.subDatePickerOptions = copy;
  }

  private disableSince(endDate: any) {
    let d: Date = new Date();
    d.setFullYear(endDate.year);
    d.setMonth(endDate.month);
    d.setDate(endDate.day + 1);
    let copy = this.getCopyOfOptions();
    copy.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.subDatePickerOptions = copy;
  }

  // Returns copy of myOptions
  private getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.subDatePickerOptions));
  }

  /*onclick() {
    this.spinnerService.show("create-reservation-spinner");
    this.model.campsite = this.authService.campsite.id;
    this.model.areaType = this.spotType;
    this.model.stays = [];
    let startDate = this.setDate(this.startDate);
    let endDate = this.setDate(this.endDate);
    startDate.setMonth(startDate.getMonth() -1);
    startDate.setHours(12);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setMonth(endDate.getMonth() -1);
    endDate.setHours(11);
    endDate.setMinutes(59);
    endDate.setSeconds(0);
    this.model.stays.push({ "guests": this.persons.filter(guest => this.validateGuests(guest)), "startDate": startDate.toISOString(), "endDate": endDate.toISOString() });
    this.model.startDate = startDate.toISOString();
    this.model.endDate = endDate.toISOString();

    let json: String = JSON.stringify(this.model);

    this.bookingService.createReservation(json)
      .subscribe(data => {
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.success("Success");
        this.router.navigate(["/portal/booking"]);
      }, error => {
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.error("Something went wrong, creating the reservation.");
      });
    
  }*/

}
export class Guest {
  id: number;
  passport: string;
  firstname: string;
  lastname: string;
  anonymous: boolean;
}
