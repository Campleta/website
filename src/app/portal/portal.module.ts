import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DropdownModule } from 'ngx-dropdown';

import { InlineSVGModule } from 'ng-inline-svg';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from './../shared/shared.module';
import { DirectivesModule } from './../directives/directives.module';
import { DragulaModule } from 'ng2-dragula';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BookingComponent } from './booking/booking.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ChooseCampsiteComponent } from './choose-campsite/choose-campsite.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InlineSVGModule,
    SharedModule,
    DragulaModule,
    DirectivesModule,
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
    ChooseCampsiteComponent
  ]
})
export class PortalModule { }
