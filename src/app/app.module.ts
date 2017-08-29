import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './services/guards/auth-guard.service';
import { CampsiteGuard } from './services/guards/campsite-guard.service';
import { PortalGuard } from './services/guards/portal-guard.service';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';
import { PortalModule } from './portal/portal.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './shared/login/login.component';

import { AuthHttpProvider } from './services/auth-http.service';
import { StartupService } from './services/startup-service.service';
import { BookingService } from './services/booking.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { SpinnerService } from './services/spinner.service';
import { AlertComponent } from './directives/alert/alert.component';
import { NotAuthorizedComponent } from './shared/not-authorized/not-authorized.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { SpinnerComponent } from './shared/spinner/spinner.component';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    PageNotFoundComponent,
    LoginComponent,
    NotAuthorizedComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    MainModule,
    PortalModule,
    AppRoutingModule
  ],
  providers: [
    AuthHttpProvider,
    AuthHttp,
    AlertService,
    SpinnerService,
    AuthenticationService,
    BookingService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    AuthGuard,
    CampsiteGuard,
    PortalGuard
  ],
  bootstrap: [AppComponent],
  exports: [
    SpinnerComponent
  ]
})
export class AppModule { }
