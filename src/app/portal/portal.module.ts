import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DropdownModule } from 'ngx-dropdown';

import { InlineSVGModule } from 'ng-inline-svg';
import { MyDatePickerModule } from 'mydatepicker';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BookingComponent } from './booking/booking.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    MyDatePickerModule,
    DropdownModule,
    PortalRoutingModule
  ],
  declarations: [
    PortalComponent,
    NavigationComponent,
    DashboardComponent,
    BookingComponent,
    CreateReservationComponent
  ]
})
export class PortalModule { }
