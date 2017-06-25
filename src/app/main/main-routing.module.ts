import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from './shared/navigation/navigation.component';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './../shared/login/login.component';

const mainRoutes: Routes = [
    { 
        path: '', 
        component: MainComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }