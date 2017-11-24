import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayGuestComponent } from './form-array-guest.component';

describe('FormArrayGuestComponent', () => {
  let component: FormArrayGuestComponent;
  let fixture: ComponentFixture<FormArrayGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArrayGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
