import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Stay } from './../../models/stay.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

const resolvedPromise = Promise.resolve(undefined);

@Component({
  selector: 'app-form-stay',
  templateUrl: './form-stay.component.html',
  styleUrls: ['./form-stay.component.css']
})
export class FormStayComponent implements OnInit, OnDestroy {

  @Input('group') stayForm: FormGroup;
  @Input() stay;
  private behavior = new BehaviorSubject<IMyDpOptions>({});
  private startDateBehavior = new BehaviorSubject<any>({});
  private endDateBehavior = new BehaviorSubject<any>({});
  @Input() in;
  @Input() staysArray;

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


  @Input()
  set setSubDateOptions(value) {
    this.behavior.next(value);
  }

  get getSubDateOptions() {
    return this.behavior.getValue();
  }

  @Input()
  set setStartDate(value) {
    this.startDateBehavior.next(value);
  }

  get getStartDate() {
    return this.startDateBehavior.getValue();
  }

  @Input()
  set setEndDate(value) {
    this.endDateBehavior.next(value);
  }

  get getEndDate() {
    return this.endDateBehavior.getValue();
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // When overall dates are changed, to subDatePickerOptions are changed too.
    this.behavior.subscribe(x => {
      this.subDatePickerOptions = this.behavior.getValue();
    });

    // When changing the overall startDate, we might have to change startDate for single stay
    this.startDateBehavior.subscribe(x => {
      if(this.in == 0) {
        // If first Stay in staysArray, then change start date to same as overall start date.
        this.stayForm.controls.startDate.setValue(this.startDateBehavior.getValue());
      } else {
        // If not first Stay in staysArray, check if startDate of stay is less than new overall start date.
        let sDate = this.convertToDate(this.stayForm.controls.startDate.value.date);
        let bDate = this.convertToDate(this.startDateBehavior.getValue().date);

        if(sDate < bDate) {
          this.stayForm.controls.startDate.setValue(this.startDateBehavior.getValue());
        }
      }

      let tmpEndDate = this.convertToDate(this.stayForm.controls.endDate.value.date);
      let tmpNewStartDate = this.convertToDate(this.stayForm.controls.startDate.value.date);
      if(tmpEndDate <= tmpNewStartDate) {
        this.stayForm.controls.endDate.setValue(this.startDateBehavior.getValue());
      }
    });

    // When changing the overall endDate, we might have to change endDate for single stay
    this.endDateBehavior.subscribe(x => {
      if(this.in == 0) {
        this.stayForm.controls.endDate.setValue(this.endDateBehavior.getValue());
      }
    });
  }

  ngOnDestroy() {
    this.behavior.unsubscribe();
    this.startDateBehavior.unsubscribe();
    this.endDateBehavior.unsubscribe();
  }

  public removeStay(stayIndex: number) {
    const control = <FormArray>this.staysArray;
    control.removeAt(stayIndex);
  }

  public addGuest(stay) {
    const control = <FormArray>stay.controls['guestArray'];
    control.push(this.initGuest());
  }

  public initGuest() {
    return this.formBuilder.group({
      anonymous: [false],
      passport: [{ value: null, disabled: false }, Validators.required],
      firstname: [{ value: null, disabled: false }, Validators.required],
      lastname: [{ value: null, disabled: false }, Validators.required]
    });
  }

  private convertToDate(datepicker: any) {
    let date = new Date();
    date.setFullYear(datepicker.year);
    date.setMonth(datepicker.month);
    date.setDate(datepicker.day);

    return date;
  }
}
