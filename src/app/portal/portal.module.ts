import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { DropdownModule } from 'ngx-dropdown';

import { DashboardComponent } from './dashboard/dashboard.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    PortalRoutingModule
  ],
  declarations: [
    PortalComponent,
    NavigationComponent,
    DashboardComponent,
    BookingComponent
  ]
})
export class PortalModule { }
