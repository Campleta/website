import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  login() {
    console.log("test", this.model);

    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(data => {
        console.log("Success", data);
      },
      error => {
        console.log("Error", error);
        this.alertService.error(error.statusText);
      });
  }

}
