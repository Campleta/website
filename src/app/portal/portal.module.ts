import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { DropdownModule } from 'ngx-dropdown';

import { InlineSVGModule } from 'ng-inline-svg';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from './../shared/shared.module';
import { DirectivesModule } from './../directives/directives.module';
import { NgDragDropModule } from 'ng-drag-drop';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BookingComponent } from './booking/booking.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ChooseCampsiteComponent } from './choose-campsite/choose-campsite.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { FormStayComponent } from './form-stay/form-stay.component';
import { FormGuestComponent } from './form-guest/form-guest.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    SharedModule,
    DirectivesModule,
    NgDragDropModule.forRoot(),
    MyDatePickerModule,
    DropdownModule,
    PortalRoutingModule
  ],
  declarations: [
    PortalComponent,
    NavigationComponent,
    DashboardComponent,
    BookingComponent,
    CreateReservationComponent,
    ChooseCampsiteComponent,
    EditReservationComponent,
    FormStayComponent,
    FormGuestComponent
  ]
})
export class PortalModule { }
