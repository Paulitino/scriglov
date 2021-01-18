import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { UserSubscribe } from './user'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private _userInfo;

  getUserInfoEdit() {
    return (this._userInfo);
  }

  getUserInfo(id: string, id_token: string, response: Function) {
    return this.http.post('https://api.scriglov.fr/account_overview', {users_id: id, token: id_token})
    .subscribe(body => {
      const res = JSON.stringify(body);
      const b = JSON.parse(res);

      let userInfo = {
        "surname": b.response[0].surname,
        "firstName": b.response[0].name,
        "doctor": b.response[0].doctor,
        "email": b.response[0].mail
      };

      this._userInfo = userInfo;

      response(userInfo);
    }, error => {
      if (error)
        response("error");
    });
  }

  updateUserInfo(first: string, last: string, id: string, id_token: string, doc: string, callback: Function) {
    return this.http.post('https://api.scriglov.fr/account_update', {users_id: id, name: first, surname: last, doc: doc, token: id_token})
    .subscribe( response => {
      const res = JSON.stringify(response);
      const b = JSON.parse(res);

      if (b.error == false) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  updatePassword(currentPassword: string, newPassword: string, id: string, id_token: string, callback: Function) {
    return this.http.post('https://api.scriglov.fr/password_update', {users_id: id, curpass: currentPassword, pass: newPassword, token: id_token})
    .subscribe( response => {
      const res = JSON.stringify(response);
      const b = JSON.parse(res);
      console.log("after request")
      console.log("b.error = "+b.error)

      if (b.error == false) {
        console.log("true")

        callback(true);
      } else {
        console.log("false")

        callback(false);
      }
    });
  }

  updateMail(id: string, newMail: string, id_token: string, callback: Function) {
    return this.http.post('https://api.scriglov.fr/mail_update', {users_id: id, new_mail: newMail, token: id_token})
    .subscribe( response => {
      const res = JSON.stringify(response);
      const b = JSON.parse(res);
      console.log("after request")
      console.log("b.error = "+b.error)

      if (b.error == false) {
        console.log("true")

        callback(true);
      } else {
        console.log("false")

        callback(false);
      }
    });
  }
}
