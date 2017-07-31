import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../services/guards/auth-guard.service';
import { PortalGuard } from './../services/guards/portal-guard.service';
 
import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

import { LoginComponent } from './../shared/login/login.component';

const portalRoutes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard, PortalGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard, PortalGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'booking', component: BookingComponent },
          { path: 'booking/create', component: CreateReservationComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(portalRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class PortalRoutingModule { }
