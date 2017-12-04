import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStayComponent } from './form-stay.component';

describe('FormStayComponent', () => {
  let component: FormStayComponent;
  let fixture: ComponentFixture<FormStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
