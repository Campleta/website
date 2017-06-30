import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule
  ],
  declarations: [
    PortalComponent,
    DashboardComponent
  ]
})
export class PortalModule { }
