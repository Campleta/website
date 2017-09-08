import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCampsiteComponent } from './choose-campsite.component';

describe('ChooseCampsiteComponent', () => {
  let component: ChooseCampsiteComponent;
  let fixture: ComponentFixture<ChooseCampsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCampsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCampsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
