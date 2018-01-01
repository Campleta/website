import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Guest } from 'app/shared/interface/reservation.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

const resolvedPromise = Promise.resolve(undefined);

@Component({
  selector: 'app-form-guest',
  templateUrl: './form-guest.component.html',
  styleUrls: ['./form-guest.component.css']
})
export class FormGuestComponent implements OnInit, OnDestroy {
  @Input('group') formGroup: FormGroup;
  @Input() guest;
  @Input() public i: Number;
  @Input() stay;

  private behavior = new BehaviorSubject<Guest>(this.guest);

  @Output() removed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.guest = {};
    this.behavior.subscribe(x => {
      this.guest = this.behavior.getValue();
    });
  }

  ngOnDestroy() {
    this.behavior.unsubscribe();
  }

  @Input()
  set setGuest(value) {
    this.behavior.next(value);
  }

  get getGuest() {
    return this.behavior.getValue();
  }

  public anonymousChange(guest, value, index: number) {
    console.log(guest);
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

  public removeGuest(stay, guestIndex) {
    const control = <FormArray>stay.controls['guestArray'];
    control.removeAt(guestIndex);
  }

}
