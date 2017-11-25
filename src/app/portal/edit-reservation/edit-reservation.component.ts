import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from './../../services/booking.service';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Reservation, Guest } from './../../shared/interface/reservation.interface';
import { AuthenticationService } from 'app/services/authentication.service';

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
  subDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
    minYear: 1900,
    maxYear: 2600,
    disableUntil: {
      year: 0,
      month: 0,
      day: 0
    },
    disableSince: {
      year: 0,
      month: 0,
      day: 0
    }
  }
  id: Number;
  private sub: any;
  availableSpots: Number = 0;

  public editReservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editReservationForm = this.formBuilder.group({
        reservationStartDate: [{
          date: {
            year: 0,
            month: 0,
            day: 0
          }
        }],
        reservationEndDate: [{
          date: {
            year: 0,
            month: 0,
            day: 0
          }
        }],
        staysArray: this.formBuilder.array([])
      });

      this.loadReservation(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public initStay() {
    let tmpStartDate = new Date();
    let tmpEndDate = new Date();
    tmpStartDate.setFullYear(this.editReservationForm.get("reservationStartDate").value.date.year);
    tmpStartDate.setMonth(this.editReservationForm.get("reservationStartDate").value.date.month);
    tmpStartDate.setDate(this.editReservationForm.get("reservationStartDate").value.date.day);
    tmpEndDate.setFullYear(this.editReservationForm.get("reservationEndDate").value.date.year);
    tmpEndDate.setMonth(this.editReservationForm.get("reservationEndDate").value.date.month);
    tmpEndDate.setDate(this.editReservationForm.get("reservationEndDate").value.date.day);
    
    return this.formBuilder.group({
      startDate: [
        {
          date: {
            year: tmpStartDate.getFullYear(),
            month: tmpStartDate.getMonth(),
            day: tmpStartDate.getDate()
          }
        }, Validators.required
      ],
      endDate: [
        {
          date: {
            year: tmpEndDate.getFullYear(),
            month: tmpEndDate.getMonth(),
            day: tmpEndDate.getDate()
          }
        }, Validators.required
      ],
      guestArray: this.formBuilder.array([
        this.initGuest(),
      ])
    });
  }

  public initStayWithData(data: any) {
    let guestFormArr = [];
    data.guests.forEach(element => {
      guestFormArr.push(this.initGuestWithData(element));
    });

    let tmpStartDate = new Date(data.startDate);
    let tmpEndDate = new Date(data.endDate);

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
      guestArray: this.formBuilder.array(
        guestFormArr
      )
    })
  }

  public initGuest() {
    return this.formBuilder.group({
      anonymous: [false],
      passport: [{value: null, disabled: false}, Validators.required],
      firstname: [{value: null, disabled: false}, Validators.required],
      lastname: [{value: null, disabled: false}, Validators.required]
    });
  }

  public initGuestWithData(data: any) {
    return this.formBuilder.group({
      anonymous: [false],
      passport: [data.passport, Validators.required],
      firstname: [data.firstname, Validators.required],
      lastname: [data.lastname, Validators.required]
    });
  }

  public anonymousChange(guest, value, index: number) {
    const tmpPassport: FormControl = guest.controls['passport'];
    const tmpFirstname: FormControl = guest.controls['firstname'];
    const tmpLastname: FormControl = guest.controls['lastname'];

    if(value.target.checked) {
      tmpPassport.disable();
      tmpFirstname.disable();
      tmpLastname.disable();
    } else {
      tmpPassport.enable();
      tmpFirstname.enable();
      tmpLastname.enable();
    }
  }

  public addStay() {
    const control = <FormArray>this.editReservationForm.controls['staysArray'];
    control.push(this.initStay());
  }

  public addStayWithData(data: any) {
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
    this.prepareRequestReservation();
  }

  private prepareRequestReservation() {
    let model: any = {};
    model.id = this.id;
    model.campsite = this.authService.campsite.id;
    //model.areaType = 0;
    let start = new Date();
    start.setFullYear(this.editReservationForm.get("reservationStartDate").value.date.year);
    start.setMonth(this.editReservationForm.get("reservationStartDate").value.date.month - 1);
    start.setDate(this.editReservationForm.get("reservationStartDate").value.date.day);
    start.setHours(12);
    start.setMinutes(0);
    start.setSeconds(0);
    let end = new Date();
    end.setFullYear(this.editReservationForm.get("reservationEndDate").value.date.year);
    end.setMonth(this.editReservationForm.get("reservationEndDate").value.date.month - 1);
    end.setDate(this.editReservationForm.get("reservationEndDate").value.date.day);
    end.setHours(11);
    end.setMinutes(59);
    end.setSeconds(0);
    model.startDate = start.toISOString();
    model.endDate = end.toISOString();
    model.stays = [];
    this.editReservationForm.get("staysArray").value.forEach(element => {
      let tmpStartDate = new Date();
      let tmpEndDate = new Date();
      tmpStartDate.setFullYear(element.startDate.date.year);
      tmpStartDate.setMonth(element.startDate.date.month);
      tmpStartDate.setDate(element.startDate.date.day);
      tmpStartDate.setHours(12);
      tmpStartDate.setMinutes(0);
      tmpStartDate.setSeconds(0);

      tmpEndDate.setFullYear(element.endDate.date.year);
      tmpEndDate.setMonth(element.endDate.date.month);
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

    console.log(model);
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
      this.disableUntil({year: resStart.getFullYear(), month: resStart.getMonth() + 1, day: resStart.getDate()})
      this.disableSince({year: resEnd.getFullYear(), month: resEnd.getMonth() + 1, day: resEnd.getDate()})

      // Add stays with guests.
      let isFirst: Boolean = true;
      response.stays.forEach(element => {
        this.addStayWithData(element);
      });
    });
  }

  public onStartDateChanged(event: IMyDateModel) {
    this.disableUntil(event.date);
  }

  public onEndDateChanged(event: IMyDateModel) {
    this.disableSince(event.date);
  }

  private disableUntil(startDate: any) {
    let d: Date = new Date();
    d.setFullYear(startDate.year);
    d.setMonth(startDate.month);
    d.setDate(startDate.day - 1);
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {year: d.getFullYear(), 
                         month: d.getMonth(), 
                         day: d.getDate()};
    this.subDatePickerOptions = copy;
  }

  private disableSince(endDate: any) {
    let d: Date = new Date();
    d.setFullYear(endDate.year);
    d.setMonth(endDate.month);
    d.setDate(endDate.day + 1);
    let copy = this.getCopyOfOptions();
    copy.disableSince = {year: d.getFullYear(), 
                         month: d.getMonth(), 
                         day: d.getDate()};
    this.subDatePickerOptions = copy;
  }

  // Returns copy of myOptions
  private getCopyOfOptions(): IMyDpOptions {
    return JSON.parse(JSON.stringify(this.subDatePickerOptions));
}

}