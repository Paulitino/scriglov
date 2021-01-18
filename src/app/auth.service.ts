import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public _isLogged = false;

  getUser(mail: string, passw: string, response: Function) {
    return this.http.post<User>('https://api.scriglov.fr/authenticate', { mail: mail, pass: passw })
      .subscribe(body => {
        const resp = JSON.stringify(body);
        const b = JSON.parse(resp);

        if (b.response == "logged-in") {
          this.setSession(mail, b.token, b.id);

          response(true);
        }
      }, error => {
        if (error) {
          response(false);
        }
      });
  }

  private setSession(email: string, token: string, id: string) {
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('id_token', JSON.stringify(token));
    localStorage.setItem('id', JSON.stringify(id));
    this._isLogged = true;
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('id_token');
    localStorage.removeItem('id');
    this._isLogged = false;
  }

  public isLogged() {
    return this._isLogged;
  }
}
