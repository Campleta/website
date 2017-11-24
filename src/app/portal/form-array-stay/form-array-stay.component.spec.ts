import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayStayComponent } from './form-array-stay.component';

describe('FormArrayStayComponent', () => {
  let component: FormArrayStayComponent;
  let fixture: ComponentFixture<FormArrayStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArrayStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
