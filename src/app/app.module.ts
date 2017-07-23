import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/guards/auth-guard.service';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { PortalModule } from './portal/portal.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/login/login.component';

import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './directives/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainModule,
    PortalModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
