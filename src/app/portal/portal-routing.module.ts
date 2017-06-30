import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './../shared/login/login.component';

const portalRoutes: Routes = [
    { 
        path: '', 
        component: PortalComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
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
