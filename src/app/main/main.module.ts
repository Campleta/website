import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { HomeComponent }    from './home/home.component';

import { MainRoutingModule } from './main-routing.module';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    NavigationComponent,
    HomeComponent
  ],
  providers: []
})
export class MainModule {}