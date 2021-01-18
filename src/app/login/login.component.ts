import { Component, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor (private authService: AuthService, private _router: Router) {}

  public model = new User('', '');
  public submitted = false;
  public fail = false;

  onSubmit() {
    this.submitted = true;
  }

  newUser() {
    const email = this.model.mail;
    let passw = this.model.pass;

    this.authService.getUser(email, passw, (worked) => {
      if (worked == false) {
        this.fail = true;
      } else if (worked == true) {
        this._router.navigate(['home']);
        this.fail = false;
      }
    });
  }
}
