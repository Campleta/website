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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.behavior.subscribe(x => {
      this.subDatePickerOptions = this.behavior.getValue();
    });
  }

  ngOnDestroy() {
    this.behavior.unsubscribe();
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
}
